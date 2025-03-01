using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Model
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }  // Primary key

        [Required]
        [MaxLength(100)]
        [Index(IsUnique = true)]
        [Column("product_code")]
        public string ProductCode { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("name")]
        public string Name { get; set; }  

        [MaxLength(500)]
        [Column("description")]
        public string Description { get; set; }  

        [Required]
        [Column("price")]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }  

        [Required]
        [Column("weight")]
        public double Weight { get; set; } 

        [Required]
        [Column("uom")]
        [MaxLength(20)]
        public string UOM { get; set; }

        [Required]
        [Column("quantity_per_uom")]
        public int QuantityPerUOM { get; set; }

        [Required]
        [Column("stock_level")]
        public int StockLevel { get; set; }

        [Column("date_created")]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        // Navigation property for the InvoiceProducts join table
        public virtual ICollection<InvoiceProduct> InvoiceProducts { get; set; }
    }
}
