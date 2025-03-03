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

    public async Task<List<string>> GetUserRolesAsync(AppUser user)
    {
        return (await _userManager.GetRolesAsync(user)).ToList();
    }

    public async Task<AppUser?> LoginAsync(string email, string password)
    {
        // Find user by email

        var user = await _userManager.FindByEmailAsync(email);
        
        if (user == null)
        {
            return null;
        }

        var loginResult = await _signInManager.PasswordSignInAsync(user, password, isPersistent: false, lockoutOnFailure: false);

        if (loginResult.Succeeded)
        {
            return user;
        } else
        {
            return null;
        }

    }

    public async Task<string> AddUserAsync(RequestCustomerRegistration newCustomer)
    {
        newCustomer.UserId = String.Concat(newCustomer.UserName, '_', newCustomer.Organization);

        var createCustomerResult = await _userManager.CreateAsync(newCustomer, newCustomer.Password);
        Console.WriteLine(createCustomerResult);
        if (createCustomerResult.Succeeded) {
            await _userManager.AddToRoleAsync(newCustomer, "Customer");
            return "Success";
        } 

        return "Failed";
        
    }

    public async Task<Customer?> GetCustomerByEmail(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is not Customer customer)
        {
            return null;
        };

        var retCustomer = new Customer
        {
            CustomerId = customer.Id,
            UserId = customer.Id,
            Email = customer.Email,
            ShippingAddress = customer.ShippingAddress,
            ContactPerson = customer.ContactPerson,
            ContactPersonEmail = customer.ContactPersonEmail,
            Organization = customer.Organization,
            PhoneNumber = user.PhoneNumber ?? "",
            CustomerName = customer.CustomerName
        };
        return retCustomer;
    }
}