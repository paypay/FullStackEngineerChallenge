using AppraisalSystemBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppraisalSystemBackend.Controllers
{
    public class AuthenticateController : Controller
    {
        DataAccessLayer da = new DataAccessLayer();

        [HttpPost]
        [Route("api/Employee/Authenticate")]
        public EmployeeBasic Authenticate([FromBody] AuthenticationDto LoginData)
        {
          return da.Login(LoginData);
        }
    }
}
