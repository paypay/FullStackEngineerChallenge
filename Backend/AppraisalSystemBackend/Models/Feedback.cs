using System;
using System.Collections.Generic;

#nullable disable

namespace AppraisalSystemBackend.Models
{
    public partial class Feedback
    {
        public int AssignedId { get; set; }
        public string Description { get; set; }
        public int? EmpId { get; set; }
        public int Id { get; set; }

        public virtual Employee Emp { get; set; }
    }

    public class FeedbackDto
    {
        public string Description { get; set; }
        public int Id { get; set; }

    }

    public class AssignFeedbackDto
    {
        public int EmployeeId { set; get; }

        public List<string> AssignedEmpId { get; set; }
    }
}
