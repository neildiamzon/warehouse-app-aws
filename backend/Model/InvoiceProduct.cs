using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Model
{
    public class InvoiceProduct
    {
        [JsonIgnore]
        [Column("invoice_id")]
        [ForeignKey("Invoice")]
        public string InvoiceId { get; set; }

        [Column("product_code")]
        [ForeignKey("Product")]
        public string ProductCode { get; set; }

        [Required]
        [Column("quantity")]
        public int Quantity { get; set; }

        [Required]
        [Column("unit_price")]
        public decimal UnitPrice { get; set; }

        [Column("total_price")]
        public decimal TotalPrice { get; set; } // Computed column in SQL

        // Navigation properties
        public virtual Invoice Invoice { get; set; }
        public virtual Product Product { get; set; }
    }
}
