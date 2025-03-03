using backend.Model;
using backend.Model.Request;
using backend.Model.Response;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace backend.Controllers
{
    [Route("api/authentication")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(IUserService userService, ILogger<AuthenticationController> logger)
        {
             _userService = userService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] RequestLogin model)
        {
            if (model == null || string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Invalid login attempt.");
            }

            var user = await _userService.LoginAsync(model.Username, model.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            Console.WriteLine("user: " + user.UserName);

            var userRole = await _userService.GetUserRolesAsync(user);

            Console.WriteLine("USER ROLE: " + userRole[0]);

            var response = new ResponseLogin {
                result = "Success",
                role = userRole
            };

            return Ok(response);
        }

        [HttpPost("/api/user-details")]
        public async Task<ActionResult<AppUser>> GetCustomerDetails([FromBody] RequestLogin email)
        {
            var foundCustomer = await _userService.GetCustomerByEmail(email.Username);
            
            return Ok(foundCustomer);
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Register([FromBody] RequestCustomerRegistration newCustomer)
        {
            Console.WriteLine(newCustomer);
            return Ok(await _userService.AddUserAsync(newCustomer));
        }
    }
}