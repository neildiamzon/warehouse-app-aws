using backend.Database;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class InventoryManagementRepository : IInventoryManagementRepository
    {
        private readonly WarehouseDbContext _context;
        public InventoryManagementRepository(WarehouseDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<string> UpdateProductAsync(Product product)
        {
            try
            {
                _context.Entry(product).Property(p => p.Name).IsModified = true;
                _context.Entry(product).Property(p => p.Description).IsModified = true;
                _context.Entry(product).Property(p => p.QuantityPerUOM).IsModified = true;
                _context.Entry(product).Property(p => p.StockLevel).IsModified = true;
                _context.Entry(product).Property(p => p.Price).IsModified = true;
                _context.Entry(product).Property(p => p.UOM).IsModified = true;

                await _context.SaveChangesAsync();
                return "Success";
            }
            catch (Exception ex)
            {
                return "Failed";
                Console.WriteLine(ex.ToString());
            }
        }

        public async Task<string> AddProductAsync(Product product)
        {
            try
            {
                product.DateCreated = DateTime.UtcNow;
                _context.Products.Add(product);
                await _context.SaveChangesAsync() ;

                return "Success";
            }
            catch (Exception ex)
            {
                return "Failed";
                Console.WriteLine(ex);
            }
        }
        public async Task<string> DeleteProductAsync(List<RequestProductDeletion> deleteProducts)
        {
            try
            {
                var productIds = deleteProducts.Select(rp => rp.ProductId).ToList();
                var productCodes = deleteProducts.Select(rp => rp.ProductCode).ToList();

                var productsToDelete = _context.Products
                            .Where(p => productIds.Contains(p.Id) || productCodes.Contains(p.ProductCode));

                _context.Products.RemoveRange(productsToDelete);

                await _context.SaveChangesAsync();

                return "Success";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return "Failed";
            }
        }
    }
}
