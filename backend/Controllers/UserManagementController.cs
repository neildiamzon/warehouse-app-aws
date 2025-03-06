using backend.Model;
using backend.Model.Response;
using backend.Services;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
public class UserManagementController : ControllerBase
{
    private readonly IUserService _userService;

    public UserManagementController (IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("users")]
    public  ActionResult<List<ResponseUsers>> GetUsers()
    {
        return Ok(_userService.GetUsersAsync());
    }

    [HttpDelete("users/{deleteId}")]
    public ActionResult<string> GetDeleteUser(string deleteId)
    {
        return Ok("Success: " + _userService.DeleteUser(deleteId).Result);
    }
}

