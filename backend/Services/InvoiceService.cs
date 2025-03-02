using backend.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class InvoiceService : IInvoiceService
{
    private readonly IInvoiceRepository _invoiceRepository;

    public InvoiceService(IInvoiceRepository invoiceRepository)
    {
        _invoiceRepository = invoiceRepository;
    }

    public async Task<IEnumerable<Invoice>> GetAllInvoicesAsync()
    {
        return await _invoiceRepository.GetAllInvoicesAsync();
    }

    public async Task<Invoice> GetInvoiceByInvoiceIdAsync(string id)
    {
        return await _invoiceRepository.GetInvoiceByInvoiceIdAsync(id);
    }

    public async Task AddInvoiceAsync(Invoice invoice)
    {
        await _invoiceRepository.AddInvoiceAsync(invoice);
    }

    public async Task UpdateInvoiceAsync(Invoice invoice)
    {
        await _invoiceRepository.UpdateInvoiceAsync(invoice);
    }

    public async Task DeleteInvoiceAsync(Guid id)
    {
        await _invoiceRepository.DeleteInvoiceAsync(id);
    }

    public async Task<Invoice> GetInvoiceByInvoiceReferenceNumberAsync(string invoiceReferenceNumber)
    {
       return await _invoiceRepository.GetInvoiceByInvoiceReferenceNumberAsync(invoiceReferenceNumber);
    }
}
