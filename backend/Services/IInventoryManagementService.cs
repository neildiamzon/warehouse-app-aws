
using backend.Model;

namespace backend.Services
{
    public interface IInventoryManagementService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<String> UpdateProductAsync(Product updatedProduct);
        Task<String> AddProductAsync(Product newProduct);
        Task<string> DeleteProductAsync(List<RequestProductDeletion> deleteProducts);

    }
}
