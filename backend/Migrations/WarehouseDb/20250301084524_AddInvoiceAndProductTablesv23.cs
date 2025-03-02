using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.WarehouseDb
{
    /// <inheritdoc />
    public partial class AddInvoiceAndProductTablesv23 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceProducts_Products_ProductId",
                table: "InvoiceProducts");

            migrationBuilder.DropIndex(
                name: "IX_Products_product_code",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_invoice_id",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_InvoiceProducts_ProductId",
                table: "InvoiceProducts");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "InvoiceProducts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "InvoiceProducts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_product_code",
                table: "Products",
                column: "product_code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_invoice_id",
                table: "Invoices",
                column: "invoice_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceProducts_ProductId",
                table: "InvoiceProducts",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceProducts_Products_ProductId",
                table: "InvoiceProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
