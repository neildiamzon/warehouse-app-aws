using backend.Model;

public interface IInventoryManagementRepository
{
    Task<IEnumerable<Product>> GetAllProductsAsync();

    Task<String> UpdateProductAsync(Product product);

    Task<String> AddProductAsync(Product product);

    Task<string> DeleteProductAsync(List<RequestProductDeletion> deleteProducts);
}

