using backend.Model;
using backend.Model.Request;
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

            var userResult = await _userService.LoginAsync(model.Username, model.Password);

            if (userResult.Succeeded)
            {
                _logger.LogInformation("User logged in.");
            }
            else
            {
                return Unauthorized("Invalid username or password.");
            }

            var user = await _userService.GetUserByNameAsync(model.Username);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var userRole = await _userService.GetUserRolesAsync(user);

            return Ok(
                userRole);
        }


    }
}
