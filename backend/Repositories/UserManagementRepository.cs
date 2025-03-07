using backend.Database;
using backend.Model;
using backend.Model.Response;
using Castle.Core.Resource;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace backend.Repositories
{
    public class UserManagementRepository : IUserManagementRepository
    {
        private readonly UserDbContext _context;

        public UserManagementRepository(UserDbContext context)
        {
            _context = context;
        }

        public List<ResponseUsers> GetAllCustomers()
        {
            var users = (
                     from customer in _context.Customers
                     join IdentityUserRole in _context.UserRoles on customer.Id equals IdentityUserRole.UserId
                     join role in _context.Roles on IdentityUserRole.RoleId equals role.Id
                     where role.Name == "Customer"
                     select new ResponseUsers
                     {
                         UserId = customer.Id,
                         Username = customer.UserName?? "",
                         Email = customer.Email?? "",
                         EmailConfirmed = customer.EmailConfirmed,
                         PhoneNumber = customer.PhoneNumber?? "",
                         PhoneNumberConfirmed = customer.PhoneNumberConfirmed,
                         CustomerId = customer.UserId,
                         CustomerName = customer.CustomerName,
                         ContactPerson = customer.ContactPerson,
                         ShippingAddress = customer.ShippingAddress,
                         ContactPersonEmail = customer.ContactPersonEmail,
                         Organization = customer.Organization
                     }).ToList();

            return users;
        }
        public async Task<bool> UpdateCustomer(Customer customer)
        {
            try
            {
                var _customer = _context.Customers.Find(customer.UserId);
                if (_customer == null)
                {
                    throw new Exception("Not Found");
                }

                _customer.CustomerName = customer.CustomerName;
                _customer.ShippingAddress = customer.ShippingAddress;
                _customer.ContactPerson = customer.ContactPerson;
                _customer.ContactPersonEmail = customer.ContactPersonEmail;
                _customer.PhoneNumber = customer.PhoneNumber;

                _context.Entry(_customer).Property(e => e.CustomerName).IsModified = true;
                _context.Entry(_customer).Property(e => e.ShippingAddress).IsModified = true;
                _context.Entry(_customer).Property(e => e.ContactPerson).IsModified = true;
                _context.Entry(_customer).Property(e => e.ContactPersonEmail).IsModified = true;
                _context.Entry(_customer).Property(e => e.PhoneNumber).IsModified = true;

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
    }
}
