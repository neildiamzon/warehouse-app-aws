using backend.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace backend
{
    public class DatabaseInitializer
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DatabaseInitializer(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task InitializeAsync(Database.WarehouseDbContext tempDbContext)
        {
            // Define roles
            var roles = new[] { "Admin", "Staff", "Customer" };

            // Create roles if they do not exist
            foreach (var role in roles)
            {
                var roleExist = await _roleManager.RoleExistsAsync(role);
                if (!roleExist)
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            // Create root admin user if it doesn't exist
            var adminEmail = "admin@example.com";
            var adminUser = await _userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                adminUser = new AppUser
                {
                    UserId = "ADMIN-001",
                    UserName = adminEmail,
                    Email = adminEmail
                };

                var createAdminResult = await _userManager.CreateAsync(adminUser, "Admin@123");

                if (createAdminResult.Succeeded)
                {
                    // Assign the Admin role to the user
                    await _userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }

            // seed data
            try
            {
                var assembly = Assembly.GetExecutingAssembly();
                var resourceName = "backend.Database.SeedData.sql";

                using (Stream stream = assembly.GetManifestResourceStream(resourceName))
                using (StreamReader reader = new StreamReader(stream))
                {
                    var sql = reader.ReadToEnd();

                    // Execute the SQL script on the database
                    tempDbContext.Database.ExecuteSqlRaw(sql);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in executing seed data. " + ex);
            }
        }
    }
}
