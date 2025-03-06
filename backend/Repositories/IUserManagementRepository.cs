using backend.Model;
using backend.Model.Response;

namespace backend.Repositories
{
    public interface IUserManagementRepository
    {
        List<ResponseUsers> GetAllCustomers();
    }
}
