using System;
using System.Collections.Generic;

#nullable disable

namespace AppraisalSystemBackend.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Feedbacks = new HashSet<Feedback>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAdmin { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
    }


    public class EmployeeBasic
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public int Id { get; set; }
    }

   

    public class EmployeeAdditionalData
    {
        public List<AssignedFeedbacks> AssignedData { get; set; }
        public List<RespondentFeedback> RespondentData { get; set; }
    }

    public class AssignedFeedbacks
    {
        public int AssignedId { get; set; }
        public string AssignedName { get; set; }
        public int Id { get; set; }
    }

    public class RespondentFeedback
    {
        public int RespondentId { get; set; }
        public string RespondentDescription { get; set; }
        public string RespondentName { get; set; }
        public int Id { get; set; }
    }
    public class GenericReturn
    {
        public bool TransactionCompleted { get; set; }
    }

    public class AuthenticationDto
    {
        public int Id { get; set; }

        public string Password { get; set; }
    }

}
