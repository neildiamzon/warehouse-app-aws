using backend.Database;
using backend.Model;
using System.Data.Entity;

public class InvoiceRepository : IInvoiceRepository
{
    private readonly WarehouseDbContext _context;

    public InvoiceRepository(WarehouseDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Invoice>> GetAllInvoicesAsync()
    {
        return await _context.Invoices.ToListAsync();
    }

    public async Task<Invoice> GetInvoiceByInvoiceIdAsync(string id)
    {
        return await _context.Invoices
            .Include(i => i.InvoiceProducts)
            .FirstOrDefaultAsync(i => i.InvoiceId == id);
    }

    public async Task AddInvoiceAsync(Invoice invoice)
    {
        await _context.Invoices.AddAsync(invoice);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateInvoiceAsync(Invoice invoice)
    {
        _context.Invoices.Update(invoice);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteInvoiceAsync(Guid id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice != null)
        {
            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<Invoice> GetInvoiceByInvoiceReferenceNumberAsync(string invoiceReferenceNumber)
    {
       return await _context.Invoices.FirstOrDefaultAsync(i => i.InvoiceReferenceNumber == invoiceReferenceNumber);
    }

    public async Task<bool> CreateInvoiceAndInvoiceProduct(Invoice inv, List<InvoiceProduct> processedIPs)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            await _context.Invoices.AddAsync(inv); 
            await _context.InvoiceProducts.AddRangeAsync(processedIPs); // Bulk insert InvoiceProducts

            await _context.SaveChangesAsync();
            await transaction.CommitAsync(); // Commit if all inserts succeed
            return true;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(); // Rollback everything on error
            Console.WriteLine($"Transaction failed: {ex.Message}");
            return false;
        }
    }
}
