using backend.Model;
using backend.Repositories;
using backend.Services;


public class InventoryManagementService : IInventoryManagementService
 {
        private readonly IInventoryManagementRepository _inventoryManagementRepository;

        public InventoryManagementService(IInventoryManagementRepository inventoryManagementRepository)
        {
            _inventoryManagementRepository = inventoryManagementRepository;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _inventoryManagementRepository.GetAllProductsAsync();
        }
        public async Task<String> UpdateProductAsync(Product product)
        {
            return await _inventoryManagementRepository.UpdateProductAsync(product); ;
        }

    public async Task<string> AddProductAsync(Product newProduct)
    {
        return await _inventoryManagementRepository.AddProductAsync(newProduct);
    }

    public async Task<string> DeleteProductAsync(List<RequestProductDeletion> deleteProducts)
    {
        return await _inventoryManagementRepository.DeleteProductAsync(deleteProducts);
    }
}

