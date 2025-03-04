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
        if (ips == null || !Request.Headers.TryGetValue("email", out var userEmail))
        {
            return BadRequest();
        }

        bool isSuccess = await _invoiceService.CreateNewInvoice(ips, userEmail);

        return Ok("Order Success");
    }
}
