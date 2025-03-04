using backend.Model;
using backend.Model.Request;
using backend.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class InvoiceService : IInvoiceService
{
    private readonly IInvoiceRepository _invoiceRepository;
    private readonly IUserService _userService;

    public InvoiceService(IInvoiceRepository invoiceRepository, IUserService userService)
    {
        _invoiceRepository = invoiceRepository;
        _userService = userService;
    }

    public async Task<IEnumerable<Invoice>> GetAllInvoicesAsync()
    {
        return await _invoiceRepository.GetAllInvoicesAsync();
    }

    public async Task<IEnumerable<Invoice>> GetAllCustomerInvoicesAsync(string customerEmail)
    {
        Customer? customer = await _userService.GetCustomerByEmail(customerEmail);

        if (customer == null)
        {
            throw new UnauthorizedAccessException("Customer not found");
        }


        return await _invoiceRepository.GetAllCustomerInvoicesAsync(customer.UserId);
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

    public async Task<bool> CreateNewInvoice(List<RequestOrderProduct> ips, String customerEmail)
    {
        Invoice? inv = await GenerateInvoice(customerEmail);
        List <InvoiceProduct> processedIPs = GenerateInvoiceProducts(inv, ips);

        await _invoiceRepository.CreateInvoiceAndInvoiceProduct(inv, processedIPs);

        return true;
    }

    private async Task<Invoice?> GenerateInvoice(String customerEmail)
    {
        Invoice invoice = new();
        Customer? customer = await _userService.GetCustomerByEmail(customerEmail);

        if ( customer == null ){
            throw new UnauthorizedAccessException("Customer not found");
        }

        InvoiceProduct product = new InvoiceProduct();

        Random rd = new Random();
        String r = rd.Next(0, 1000000).ToString("D6");

        invoice.CustomerName = customer.CustomerName;
        invoice.InvoiceReferenceNumber = String.Concat(customer.Organization, '-', invoice.DateCreated);
        invoice.InvoiceId = String.Concat(customer.Organization, '-', r);
        invoice.ShippingAddress = customer.ShippingAddress;
        invoice.Shipped = "No";
        invoice.InvoiceStatus = "UNPAID";
        invoice.UserId = customer.UserId;

        return invoice;
    }

    private List<InvoiceProduct> GenerateInvoiceProducts (Invoice inv, List<RequestOrderProduct> ips)
    {
        List<InvoiceProduct> products = new ();

        ips.ForEach(orderedProduct =>
        {
            InvoiceProduct tempIp = new();

            tempIp.ProductCode = orderedProduct.ProductCode;
            tempIp.InvoiceId = inv.InvoiceId;

            tempIp.UnitPrice = orderedProduct.UnitPrice;
            tempIp.Quantity = orderedProduct.Quantity;
            tempIp.TotalPrice = orderedProduct.TotalPrice;
            inv.TotalCost += tempIp.TotalPrice;

            products.Add(tempIp);
        });
        return products;
    }
}
