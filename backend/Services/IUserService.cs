using backend.Model;
using Microsoft.AspNetCore.Identity;

namespace backend.Services
{
    public interface IUserService
    {
        Task<AppUser?> GetUserByIdAsync(string userId);
        Task<List<string>> GetUserRolesAsync(AppUser user);
        Task<AppUser?> GetUserByNameAsync(string userName);
        Task<SignInResult> LoginAsync(string email, string password);
    }
}
