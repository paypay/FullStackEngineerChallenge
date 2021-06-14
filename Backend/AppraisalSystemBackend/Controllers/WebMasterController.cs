using AppraisalSystemBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppraisalSystemBackend.Controllers
{
    #region All admin related routes are handled in this controller
    public class WebMasterController : Controller
    {
        DataAccessLayer da = new DataAccessLayer();

        #region Method to get all employee

        [HttpGet]
        [Route("api/WebMaster/GetEmployee")]
        public IEnumerable<EmployeeBasic> GetEmployee()
        {
            return da.GetAllEmployees();
        }
        #endregion

        #region Method to add new employee
        [HttpPost]
        [Route("api/WebMaster/CreateEmployee")]
        public GenericReturn Create([FromBody] Employee employee)
        {
            return da.AddEmployee(employee);
        }
        #endregion

        #region Method get employee details from id
        [HttpGet]
        [Route("api/WebMaster/GetEmployeeDetails/{id}")]
        public Employee Details(int id)
        {
            return da.GetEmployeeData(id);
        }
        #endregion

        #region Method to update employee
        [HttpPut]
        [Route("api/WebMaster/UpdateEmployeeDetails")]
        public GenericReturn Edit([FromBody] EmployeeBasic employee)
        {
            return da.UpdateEmployee(employee);
        }
        #endregion

        #region Method to delete employee
        [HttpDelete]
        [Route("api/WebMaster/DeleteEmployee/{id}")]
        public GenericReturn Delete(int id)
        {
            return da.DeleteEmployee(id);
        }
        #endregion

        #region Method to fetch additional information of employee
        [HttpGet]
        [Route("api/WebMaster/EmployeeAdditionalInfo/{id}")]
        public EmployeeAdditionalData EmployeeAdditionalInfo(string id)
        {
            return da.EmployeeData(Convert.ToInt32(id));
        }
        #endregion


        #region Method to update employee feedback
        [HttpPut]
        [Route("api/WebMaster/UpdateEmployeeFeedback")]
        public GenericReturn EditFeedback([FromBody] FeedbackDto feedback)
        {
            return da.UpdateEmployeeFeedback(feedback);
        }
        #endregion


        #region Method to delete employee feedback
        [HttpDelete]
        [Route("api/WebMaster/DeleteEmployeeFeedback/{id}")]
        public GenericReturn DeleteEmployeeFeedback(int id)
        {
            return da.DeleteEmployeeFeedback(id);
        }
        #endregion

        #region Method to assign feedback to employee
        [HttpPost]
        [Route("api/WebMaster/AssignFeedback/")]
        public GenericReturn AssignFeedback([FromBody] AssignFeedbackDto feedbackData)
        {
            return da.AssignFeedback(feedbackData);
        }
        #endregion



    }
    #endregion
}
