using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Model
{
    public class Invoice
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("invoice_id")]
        public string InvoiceId { get; set; }

        [Required]
        [Column("invoice_reference_number")]
        public string InvoiceReferenceNumber { get; set; }

        [Required]
        [Column("user_id")]
        public string UserId { get; set; }

        [Required]
        [Column("customer_name")]
        public string CustomerName { get; set; }

        [Required]
        [Column("shipping_address")]
        public string ShippingAddress { get; set; }

        [Required]
        [Column("total_cost")]
        [DataType(DataType.Currency)]
        public decimal TotalCost { get; set; }

        [Required]
        [Column("shipped")]
        public string Shipped { get; set; }

        [Required]
        [Column("invoice_status")]
        public string InvoiceStatus { get; set; }

        [Column("date_created")]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        // Navigation property for the InvoiceProducts join table
        public virtual ICollection<InvoiceProduct> InvoiceProducts { get; set; } // Navigation property
    }
}
