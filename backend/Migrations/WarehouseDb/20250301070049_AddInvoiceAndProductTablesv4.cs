using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.WarehouseDb
{
    /// <inheritdoc />
    public partial class AddInvoiceAndProductTablesv4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceProducts_Invoices_InvoiceId",
                table: "InvoiceProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceProducts_Products_ProductId",
                table: "InvoiceProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InvoiceProducts",
                table: "InvoiceProducts");

            migrationBuilder.RenameColumn(
                name: "InvoiceId",
                table: "InvoiceProducts",
                newName: "invoice_id");

            migrationBuilder.AlterColumn<string>(
                name: "invoice_id",
                table: "Invoices",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "InvoiceProducts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "invoice_id",
                table: "InvoiceProducts",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "product_code",
                table: "InvoiceProducts",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "quantity",
                table: "InvoiceProducts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "total_price",
                table: "InvoiceProducts",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "unit_price",
                table: "InvoiceProducts",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Products_product_code",
                table: "Products",
                column: "product_code");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Invoices_invoice_id",
                table: "Invoices",
                column: "invoice_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InvoiceProducts",
                table: "InvoiceProducts",
                columns: new[] { "invoice_id", "product_code" });

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
                name: "IX_InvoiceProducts_product_code",
                table: "InvoiceProducts",
                column: "product_code");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceProducts_Invoices_invoice_id",
                table: "InvoiceProducts",
                column: "invoice_id",
                principalTable: "Invoices",
                principalColumn: "invoice_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceProducts_Products_ProductId",
                table: "InvoiceProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceProducts_Products_product_code",
                table: "InvoiceProducts",
                column: "product_code",
                principalTable: "Products",
                principalColumn: "product_code",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceProducts_Invoices_invoice_id",
                table: "InvoiceProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceProducts_Products_ProductId",
                table: "InvoiceProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceProducts_Products_product_code",
                table: "InvoiceProducts");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Products_product_code",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_product_code",
                table: "Products");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Invoices_invoice_id",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_invoice_id",
                table: "Invoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InvoiceProducts",
                table: "InvoiceProducts");

            migrationBuilder.DropIndex(
                name: "IX_InvoiceProducts_product_code",
                table: "InvoiceProducts");

            migrationBuilder.DropColumn(
                name: "product_code",
                table: "InvoiceProducts");

            migrationBuilder.DropColumn(
                name: "quantity",
                table: "InvoiceProducts");

            migrationBuilder.DropColumn(
                name: "total_price",
                table: "InvoiceProducts");

            migrationBuilder.DropColumn(
                name: "unit_price",
                table: "InvoiceProducts");

            migrationBuilder.RenameColumn(
                name: "invoice_id",
                table: "InvoiceProducts",
                newName: "InvoiceId");

            migrationBuilder.AlterColumn<string>(
                name: "invoice_id",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "InvoiceProducts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InvoiceId",
                table: "InvoiceProducts",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InvoiceProducts",
                table: "InvoiceProducts",
                columns: new[] { "InvoiceId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceProducts_Invoices_InvoiceId",
                table: "InvoiceProducts",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceProducts_Products_ProductId",
                table: "InvoiceProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
