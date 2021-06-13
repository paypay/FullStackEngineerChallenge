using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace AppraisalSystemBackend.Models
{
    public class DataAccessLayer
    {
        CompanyContext context = new CompanyContext();



        #region GetAll employee method called from admin portal for showing list of employees
        public IEnumerable<EmployeeBasic> GetAllEmployees()
        {
            try
            {
                var employees = (from user in context.Employees
                                 where user.IsAdmin == false
                                 select new EmployeeBasic
                                 {
                                     Name = user.Name,
                                     Email = user.Email,
                                     IsAdmin = user.IsAdmin,
                                     Id = user.Id
                                 });
                // Returning only employee who are not admin
                return employees;
            }
            catch
            {
                throw;
            }
        }
        #endregion

        #region Method to add new employee called from admin portal  

        public GenericReturn AddEmployee(Employee employee)
        {
            try
            {
                var tEmp = employee;
                var lastId = (from user in context.Employees
                              orderby user.Id descending
                              select user).ToArray().First();
                tEmp.Id = lastId.Id + 1;
                tEmp.Password = "Password-" + (lastId.Id + 1);
                foreach (var item in tEmp.Feedbacks)
                {
                    item.EmpId = tEmp.Id;
                }
                context.Employees.Add(tEmp);
                context.SaveChanges();
                // Return true on adding new employee to DB
                return new GenericReturn
                {
                    TransactionCompleted = true
                };
            }
            catch
            {
                throw;
            }
        }
        #endregion


        #region Method to update employee basic details from admin portal
        public GenericReturn UpdateEmployee(EmployeeBasic employee)
        {
            try
            {
                checkIfEntityExits(employee.Id, "Employee");
                Employee emp = (from user in context.Employees
                                where user.Id == employee.Id
                                select user).ToList().FirstOrDefault();

                emp.Name = employee.Name;
                emp.IsAdmin = employee.IsAdmin;
                emp.Email = employee.Email;

                context.Entry(emp).State = EntityState.Modified;
                context.SaveChanges();

                //Return true on data successfully saved to DB.
                return new GenericReturn
                {
                    TransactionCompleted = true
                };

            }
            catch
            {
                throw;
            }
        }
        #endregion

        #region Method to get details of employee from emp Id
        public Employee GetEmployeeData(int id)
        {
            try
            {
                Employee employee = context.Employees.Find(id);
                if (employee == null)
                {
                    throw new ArgumentException($"Invalid Employee Id");
                }
                return employee;
            }
            catch
            {
                throw;
            }
        }
        #endregion

        #region Method to delete employee from empId
        public GenericReturn DeleteEmployee(int id)
        {
            try
            {
                var fb = (from feedback in context.Feedbacks
                               where feedback.AssignedId == id || feedback.EmpId == id
                               select feedback
                               ).ToList();

                foreach(var item in fb)
                {
                    Feedback fback = context.Feedbacks.Find(item.Id);
                    context.Feedbacks.Remove(fback);
                }

                Employee emp = context.Employees.Find(id);
                context.Employees.Remove(emp);
                context.SaveChanges();
                return new GenericReturn
                {
                    TransactionCompleted = true
                };
            }
            catch
            {
                throw;
            }
        }

        #endregion

        #region Method to authenticate employee based on empId
        public EmployeeBasic Login(AuthenticationDto LoginData)
        {
            try
            {
                var t = context.Employees.Find(LoginData.Id);
                if (context.Employees.Find(LoginData.Id) == null)
                {
                    throw new ArgumentException("Invalid Employee Id");
                }
               

                var tuser = (from user in context.Employees
                             where LoginData.Id == user.Id
                             select new EmployeeBasic {
                                 Name = user.Name,
                                 Email = user.Email,
                                 IsAdmin = user.IsAdmin,
                                 Id = user.Id
                             }).ToArray().First();
               return tuser;
            }
            catch
            {

                throw new ArgumentException("Invalid Employee Id");
            }
        }
        #endregion

        #region Method to fetch additional data of employee from empId used in admin portal
        public EmployeeAdditionalData EmployeeData(int Id)
        {

            // Assigned = Employee assigned to given to passed Id for feedback
            //Respondent = Employee who would be giving feedback to passed Id
            try
            {
                // Fetch assigned employee

                var FeedbackResult = (from feedback in context.Feedbacks
                                      join user in context.Employees on feedback.EmpId equals user.Id
                                      where feedback.EmpId == Id
                                      select new AssignedFeedbacks
                                      {
                                          AssignedId = feedback.AssignedId,
                                          Id = feedback.Id

                                      }).ToList();

                // Set assigned employee name
                foreach (var feedback in FeedbackResult)
                {
                    feedback.AssignedName = context.Employees.Find(feedback.AssignedId).Name;
                }
                //Fetch respondent employee
                var Respondent = (from feedback in context.Feedbacks
                                  where feedback.AssignedId == Id
                                  select new RespondentFeedback
                                  {
                                      RespondentId = (int)feedback.EmpId,
                                      RespondentDescription = feedback.Description,
                                      Id = feedback.Id

                                  }).ToList();
                //Set respondent employee name
                foreach (var item in Respondent)
                {
                    item.RespondentName = context.Employees.Find(item.RespondentId).Name;
                }

                var response = new EmployeeAdditionalData
                {
                    AssignedData = FeedbackResult,
                    RespondentData = Respondent
                };

                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Method to fetch assigned feedback from emp ID
        public List<AssignedFeedbacks> ViewAssignedFeedback(int Id)
        {
            try
            {
                checkIfEntityExits(Id, "Employee");

                var FeedbackResult = (from feedback in context.Feedbacks
                                      join user in context.Employees on feedback.EmpId equals user.Id
                                      where feedback.EmpId == Id
                                      select new AssignedFeedbacks
                                      {
                                          AssignedId = feedback.AssignedId,
                                          Id = feedback.Id
                                      }).ToList();

                // Set assigned employee name
                foreach (var feedback in FeedbackResult)
                {
                    feedback.AssignedName = context.Employees.Find(feedback.AssignedId).Name;
                }
                return FeedbackResult;
            }
            catch
            {
                throw;
            }
        }
        #endregion

        #region Method to get feedback from feedback id for employee portal 
        public Feedback GetEmployeeFeedback(int Id)
        {
            try
            {
                Feedback feed = context.Feedbacks.Find(Id);
                if (feed == null)
                {
                    throw new ArgumentException($"Invalid Id");
                }
                return feed;
            }
            catch
            {
                throw;
            }
        }
        #endregion

        #region Method to update feedback based on Id
        public GenericReturn UpdateEmployeeFeedback(FeedbackDto feedbackData)
        {
            try
            {
                checkIfEntityExits(feedbackData.Id, "Feedback");
                Feedback emp = (from feedback in context.Feedbacks
                                where feedback.Id == feedbackData.Id
                                select feedback).ToList().FirstOrDefault();

                emp.Description = feedbackData.Description;

                context.Entry(emp).State = EntityState.Modified;
                context.SaveChanges();

                //Return true on data successfully saved to DB.
                return new GenericReturn
                {
                    TransactionCompleted = true
                };



            }
            catch
            {
                throw;
            }
        }

        #endregion

        #region Method to delete feedback based on Id
        public GenericReturn DeleteEmployeeFeedback(int id)
        {
            try
            {
                checkIfEntityExits(id, "Feedback");
                Feedback fb = context.Feedbacks.Find(id);

                context.Feedbacks.Remove(fb);
                context.SaveChanges();

                //Return true on data successfully saved to DB.
                return new GenericReturn
                {
                    TransactionCompleted = true
                };

            }
            catch
            {
                throw;
            }
        }

        #endregion

        #region Method to assign new feedback called from admin portal  

        public GenericReturn AssignFeedback(AssignFeedbackDto feedbackData)
        {
            try
            {
                foreach (var fb in feedbackData.AssignedEmpId)
                {
                    var temp = new Feedback()
                    {
                        EmpId = feedbackData.EmployeeId,
                        AssignedId = Convert.ToInt32(fb),


                    };
                    context.Feedbacks.Add(temp);

                }
                context.SaveChanges();
                // Return true on adding new employee to DB
                return new GenericReturn
                {
                    TransactionCompleted = true
                };
            }
            catch
            {
                throw;
            }
        }
        #endregion


        #region Method to check if entity exists else throw exception
        private void checkIfEntityExits(int Id, string type)
        {
            switch (type)
            {
                case "Employee":
                    {
                        if (context.Employees.Find(Id) == null)
                        {
                            throw new ArgumentException("Invalid Employee Id");
                        }
                        break;
                    }
                case "Feedback":
                    {
                        if (context.Feedbacks.Find(Id) == null)
                        {
                            throw new ArgumentException("Invalid Feedback Id");
                        }
                        break;
                    }
            }

        }
        #endregion
    }
}
