using AppraisalSystemBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppraisalSystemBackend.Controllers
{
    #region All employee related routes are handled in this controller
    public class EmployeeController : Controller
    {
        DataAccessLayer da = new DataAccessLayer();


        [HttpGet]
        [Route("api/Employee/ViewFeedback/{Id}")]
        public List<AssignedFeedbacks> GetEmployee(int Id)
        {
            return da.ViewAssignedFeedback(Convert.ToInt32(Id));
        }

        [HttpGet]
        [Route("api/Employee/GetFeedback/{Id}")]
        public Feedback GetEmployeeFeedback(int Id)
        {
            return da.GetEmployeeFeedback(Convert.ToInt32(Id));
        }

        #region Method for updating feedback
        [HttpPut]
        [Route("api/Employee/UpdateFeedback")]
        public GenericReturn UpdateFeedback([FromBody] FeedbackDto feedback)
        {
            return da.UpdateEmployeeFeedback(feedback);
        }
        #endregion
    }
    #endregion
}
