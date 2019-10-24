using System.Collections.Generic;
using System.Linq;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class IgnoresController : ControllerBase
    {
        private readonly DataContext context;

        public IgnoresController(DataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// GET api/ignores
        /// </summary>
        /// <returns>A list of ignores</returns>
        [HttpGet]

        public ActionResult<List<Ignore>> Get()
        {
            return this.context.Ignores.ToList();
        }
        /// <summary>
        /// POST api/ignores
        /// </summary>
        /// <param name="request">Json request containing ignore fields</param>
        /// <returns>A new word</returns>
        [HttpPost]
        public ActionResult<Ignore> Create([FromBody]Ignore request)
        {
            var ignore = new Ignore
            {
                Id = request.Id,
                IgWord = request.IgWord
            };

            context.Ignores.Add(ignore);
            var success = context.SaveChanges() > 0;

            if (success)
            {
                return ignore;
            }

            throw new System.Exception("Error adding word");
        }
    }
}