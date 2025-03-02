using backend.Model;
using backend.Model.Request;
using backend.Services;
using Microsoft.AspNetCore.Identity;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;

    public UserService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<AppUser?> GetUserByIdAsync(string userId)
    {
        return await _userManager.FindByIdAsync(userId);
    }

    public async Task<AppUser?> GetUserByNameAsync(string userName)
    {
        return await _userManager.FindByNameAsync(userName);
    }

    public async Task<List<string>> GetUserRolesAsync(AppUser user)
    {
        return (await _userManager.GetRolesAsync(user)).ToList();
    }

    public async Task<SignInResult> LoginAsync(string email, string password)
    {
        // Find user by email
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return SignInResult.Failed;
        }

        // Authenticate user using SignInManager
        return await _signInManager.PasswordSignInAsync(user, password, isPersistent: false, lockoutOnFailure: false);
    }

    public async Task<string> AddUserAsync(RequestCustomerRegistration newCustomer)
    {
        var createCustomerResult = await _userManager.CreateAsync(newCustomer, newCustomer.Password);
        Console.WriteLine(createCustomerResult);
        if (createCustomerResult.Succeeded) {
            await _userManager.AddToRoleAsync(newCustomer, "Customer");
            return "Success";
        } 

        return "Failed";
        
    }

}