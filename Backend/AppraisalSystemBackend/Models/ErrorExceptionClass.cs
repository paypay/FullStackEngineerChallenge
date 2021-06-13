using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace AppraisalSystemBackend.Models
{
    public class ErrorExceptionClass: Exception
    {
        public HttpStatusCode code { get; set; }

        public ErrorExceptionClass(HttpResponseMessage msg): base()
        {
            // code = statusCode;
        }

    }
}
