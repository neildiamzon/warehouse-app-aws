using backend.Model;
using backend.Model.Request;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class InvoicesController : ControllerBase
{
    private readonly IInvoiceService _invoiceService;

    public InvoicesController(IInvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }

    // GET: api/invoices
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
    {
        return Ok (await _invoiceService.GetAllInvoicesAsync());
    }

    [HttpGet("/api/my-orders")]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetCustomerInvoices()
    {
        if (!Request.Headers.TryGetValue("email", out var customerEmail))
        {
            return BadRequest("Something went wrong.");
        }
        return Ok(await _invoiceService.GetAllCustomerInvoicesAsync(customerEmail));
    }

    // GET: api/invoices/{invoiceId}
    [HttpGet("{invoiceId}")]
    public async Task<ActionResult<Invoice>> GetInvoiceByInvoiceId(string invoiceId)
    {
        var invoice = await _invoiceService.GetInvoiceByInvoiceIdAsync(invoiceId);

        if (invoice == null)
        {
            return NotFound();
        }

        return invoice;
    }

    // POST: /api/new-order
    [HttpPost("/api/new-order")]
    public async Task<IActionResult> CreateNewInvoice([FromBody] List<RequestOrderProduct> ips)
    {
        if (ips == null || !Request.Headers.TryGetValue("email", out var customerEmail))
        {
            return BadRequest();
        }

        bool isSuccess = await _invoiceService.CreateNewInvoice(ips, customerEmail);

        return Ok("Order Success");
    }

    [HttpPut("cancel-invoice/{invId}")]
    public async Task<IActionResult> CancelInvoice(string invId)
    {
        if (await _invoiceService.CancelCustomerInvoice(invId))
        {
            return Ok("Invoice cancelled");
        }

        return BadRequest();

    }
}
