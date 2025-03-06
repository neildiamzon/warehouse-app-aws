using backend.Model;

public interface IInvoiceRepository
{
    Task<IEnumerable<Invoice>> GetAllInvoicesAsync();
    Task<IEnumerable<Invoice>> GetAllCustomerInvoicesAsync(string customerEmail);
    Task<Invoice> GetInvoiceByInvoiceIdAsync(string id);
    Task AddInvoiceAsync(Invoice invoice);
    Task UpdateInvoiceAsync(Invoice invoice);
    Task DeleteInvoiceAsync(Guid id);
    Task<Invoice> GetInvoiceByInvoiceReferenceNumberAsync(string invoiceReferenceNumber);
    Task<bool> CreateInvoiceAndInvoiceProduct(Invoice inv, List<InvoiceProduct> processedIPs);
    Task<bool> CancelCustomerInvoiceAsync(Invoice inv);
}
