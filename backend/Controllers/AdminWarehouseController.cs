using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class AdminWarehouseController : ControllerBase
    {
        private readonly ILogger<AdminWarehouseController> _logger;

        [HttpGet(Name = "api/getProduct")]
        public void Get()
        {
           
        }
    }
}
