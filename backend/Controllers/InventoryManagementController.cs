using backend.Model;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryManagementController : ControllerBase
    {
        private readonly IInventoryManagementService _inventoryManagementService;

        public InventoryManagementController(IInventoryManagementService inventoryManagementService)
        {
            _inventoryManagementService = inventoryManagementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return Ok(await _inventoryManagementService.GetAllProductsAsync());
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct ([FromBody] Product updatedProduct)
        {
            return Ok(await _inventoryManagementService.UpdateProductAsync(updatedProduct));
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product newProduct)
        {
            return Ok(await _inventoryManagementService.AddProductAsync(newProduct));
        }

        [HttpDelete("DeleteProducts")]
        public async Task<IActionResult> DeleteProduct(List<RequestProductDeletion> deleteProducts)
        {
            return Ok(await _inventoryManagementService.DeleteProductAsync(deleteProducts));
        }
    }
}
