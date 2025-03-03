﻿using backend.Model;
using backend.Model.Request;
using Microsoft.AspNetCore.Identity;

namespace backend.Services
{
    public interface IUserService
    {
        Task<AppUser?> GetUserByIdAsync(string userId);
        Task<List<string>> GetUserRolesAsync(AppUser user);
        Task<AppUser?> GetUserByNameAsync(string userName);
        Task<AppUser?> LoginAsync(string email, string password);
        Task<string> AddUserAsync(RequestCustomerRegistration newCustomer);
    }
}
