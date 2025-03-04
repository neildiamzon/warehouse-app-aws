using backend.Model;
using backend.Model.Request;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface IInvoiceService
{
    Task<IEnumerable<Invoice>> GetAllInvoicesAsync();
    Task<Invoice> GetInvoiceByInvoiceIdAsync(string id);
    Task AddInvoiceAsync(Invoice invoice);
    Task UpdateInvoiceAsync(Invoice invoice);
    Task DeleteInvoiceAsync(Guid id);
    Task<Invoice> GetInvoiceByInvoiceReferenceNumberAsync(string id);
    Task<bool> CreateNewInvoice(List<RequestOrderProduct> ips, String userEmail);
}
