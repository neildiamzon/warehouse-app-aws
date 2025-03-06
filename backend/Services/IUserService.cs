using backend.Model;
using backend.Model.Request;
using backend.Model.Response;
using Microsoft.AspNetCore.Identity;

namespace backend.Services
{
    public interface IUserService
    {
        Task<AppUser?> GetUserByIdAsync(string userId);
        Task<List<string>> GetUserRolesAsync(AppUser user);
        Task<Customer?> GetCustomerByEmail(string email);
        Task<AppUser?> LoginAsync(string email, string password);
        Task<string> AddUserAsync(RequestCustomerRegistration newCustomer);
        List<ResponseUsers> GetUsersAsync();
        Task<bool> DeleteUser(string id);
    }
}
