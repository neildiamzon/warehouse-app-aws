using backend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace backend.Database
{
    public class WarehouseDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public WarehouseDbContext(DbContextOptions<WarehouseDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<Product> Products { get; set; }
        // DbSet for the junction table
        public DbSet<InvoiceProduct> InvoiceProducts { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Composite Key configuration
            modelBuilder.Entity<InvoiceProduct>()
                .HasKey(ip => new { ip.InvoiceId, ip.ProductCode });

            // Configure the relationship between InvoiceProduct and Product using ProductCode as the foreign key
            modelBuilder.Entity<InvoiceProduct>()
                .HasOne(ip => ip.Product)
                .WithMany(p => p.InvoiceProducts)
                .HasForeignKey(ip => ip.ProductCode)
                .HasPrincipalKey(p => p.ProductCode);

            // Configure the relationship between InvoiceProduct and Invoice using InvoiceId as the foreign key
            modelBuilder.Entity<InvoiceProduct>()
                .HasOne(ip => ip.Invoice)
                .WithMany(i => i.InvoiceProducts)
                .HasForeignKey(ip => ip.InvoiceId)
                .HasPrincipalKey(i => i.InvoiceId);

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("WarehouseDbConnection");

            optionsBuilder
                .UseLazyLoadingProxies()  // TODO: study this 
                .UseSqlServer(connectionString);
    
        }
    }
}
