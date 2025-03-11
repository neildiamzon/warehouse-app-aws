IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250228190508_AddInvoiceAndProductTables'
)
BEGIN
    CREATE TABLE [Invoices] (
        [Id] int NOT NULL IDENTITY,
        [invoice_id] nvarchar(max) NOT NULL,
        [invoice_reference_number] nvarchar(max) NOT NULL,
        [user_id] nvarchar(max) NOT NULL,
        [customer_name] nvarchar(max) NOT NULL,
        [shipping_address] nvarchar(max) NOT NULL,
        [total_cost] decimal(18,2) NOT NULL,
        [shipped] bit NOT NULL,
        [invoice_status] nvarchar(max) NOT NULL,
        [DateCreated] datetime2 NOT NULL,
        CONSTRAINT [PK_Invoices] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250228190508_AddInvoiceAndProductTables'
)
BEGIN
    CREATE TABLE [Products] (
        [Id] int NOT NULL IDENTITY,
        [product_code] nvarchar(100) NOT NULL,
        [name] nvarchar(100) NOT NULL,
        [description] nvarchar(500) NOT NULL,
        [price] decimal(18,2) NOT NULL,
        [weight] float NOT NULL,
        [uom] nvarchar(20) NOT NULL,
        [quantity_per_uom] int NOT NULL,
        [stock_level] int NOT NULL,
        [date_created] datetime2 NOT NULL,
        CONSTRAINT [PK_Products] PRIMARY KEY ([Id])
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250228190508_AddInvoiceAndProductTables'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250228190508_AddInvoiceAndProductTables', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250228191122_AddInvoiceAndProductTablesv2'
)
BEGIN
    DECLARE @var sysname;
    SELECT @var = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoices]') AND [c].[name] = N'shipped');
    IF @var IS NOT NULL EXEC(N'ALTER TABLE [Invoices] DROP CONSTRAINT [' + @var + '];');
    ALTER TABLE [Invoices] ALTER COLUMN [shipped] nvarchar(max) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250228191122_AddInvoiceAndProductTablesv2'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250228191122_AddInvoiceAndProductTablesv2', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250228212854_AddInvoiceAndProductTablesv3'
)
BEGIN
    CREATE TABLE [InvoiceProducts] (
        [InvoiceId] int NOT NULL,
        [ProductId] int NOT NULL,
        CONSTRAINT [PK_InvoiceProducts] PRIMARY KEY ([InvoiceId], [ProductId]),
        CONSTRAINT [FK_InvoiceProducts_Invoices_InvoiceId] FOREIGN KEY ([InvoiceId]) REFERENCES [Invoices] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_InvoiceProducts_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]) ON DELETE CASCADE
    );
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250228212854_AddInvoiceAndProductTablesv3'
)
BEGIN
    CREATE INDEX [IX_InvoiceProducts_ProductId] ON [InvoiceProducts] ([ProductId]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250228212854_AddInvoiceAndProductTablesv3'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250228212854_AddInvoiceAndProductTablesv3', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] DROP CONSTRAINT [FK_InvoiceProducts_Invoices_InvoiceId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] DROP CONSTRAINT [FK_InvoiceProducts_Products_ProductId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] DROP CONSTRAINT [PK_InvoiceProducts];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    EXEC sp_rename N'[InvoiceProducts].[InvoiceId]', N'invoice_id', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoices]') AND [c].[name] = N'invoice_id');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Invoices] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [Invoices] ALTER COLUMN [invoice_id] nvarchar(450) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[InvoiceProducts]') AND [c].[name] = N'ProductId');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [InvoiceProducts] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [InvoiceProducts] ALTER COLUMN [ProductId] int NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[InvoiceProducts]') AND [c].[name] = N'invoice_id');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [InvoiceProducts] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [InvoiceProducts] ALTER COLUMN [invoice_id] nvarchar(450) NOT NULL;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] ADD [product_code] nvarchar(100) NOT NULL DEFAULT N'';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] ADD [quantity] int NOT NULL DEFAULT 0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] ADD [total_price] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] ADD [unit_price] decimal(18,2) NOT NULL DEFAULT 0.0;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [Products] ADD CONSTRAINT [AK_Products_product_code] UNIQUE ([product_code]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [Invoices] ADD CONSTRAINT [AK_Invoices_invoice_id] UNIQUE ([invoice_id]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] ADD CONSTRAINT [PK_InvoiceProducts] PRIMARY KEY ([invoice_id], [product_code]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Products_product_code] ON [Products] ([product_code]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    CREATE UNIQUE INDEX [IX_Invoices_invoice_id] ON [Invoices] ([invoice_id]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    CREATE INDEX [IX_InvoiceProducts_product_code] ON [InvoiceProducts] ([product_code]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] ADD CONSTRAINT [FK_InvoiceProducts_Invoices_invoice_id] FOREIGN KEY ([invoice_id]) REFERENCES [Invoices] ([invoice_id]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] ADD CONSTRAINT [FK_InvoiceProducts_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [Products] ([Id]);
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    ALTER TABLE [InvoiceProducts] ADD CONSTRAINT [FK_InvoiceProducts_Products_product_code] FOREIGN KEY ([product_code]) REFERENCES [Products] ([product_code]) ON DELETE CASCADE;
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070049_AddInvoiceAndProductTablesv4'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301070049_AddInvoiceAndProductTablesv4', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301070955_AddInvoiceAndProductTablesv5'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301070955_AddInvoiceAndProductTablesv5', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301071134_AddInvoiceAndProductTablesv6'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301071134_AddInvoiceAndProductTablesv6', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301073017_AddInvoiceAndProductTablesv7'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301073017_AddInvoiceAndProductTablesv7', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301073236_AddInvoiceAndProductTablesv20'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301073236_AddInvoiceAndProductTablesv20', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301082848_AddInvoiceAndProductTablesv21'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301082848_AddInvoiceAndProductTablesv21', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301083133_AddInvoiceAndProductTablesv22'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301083133_AddInvoiceAndProductTablesv22', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301084524_AddInvoiceAndProductTablesv23'
)
BEGIN
    ALTER TABLE [InvoiceProducts] DROP CONSTRAINT [FK_InvoiceProducts_Products_ProductId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301084524_AddInvoiceAndProductTablesv23'
)
BEGIN
    DROP INDEX [IX_Products_product_code] ON [Products];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301084524_AddInvoiceAndProductTablesv23'
)
BEGIN
    DROP INDEX [IX_Invoices_invoice_id] ON [Invoices];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301084524_AddInvoiceAndProductTablesv23'
)
BEGIN
    DROP INDEX [IX_InvoiceProducts_ProductId] ON [InvoiceProducts];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301084524_AddInvoiceAndProductTablesv23'
)
BEGIN
    DECLARE @var4 sysname;
    SELECT @var4 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[InvoiceProducts]') AND [c].[name] = N'ProductId');
    IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [InvoiceProducts] DROP CONSTRAINT [' + @var4 + '];');
    ALTER TABLE [InvoiceProducts] DROP COLUMN [ProductId];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301084524_AddInvoiceAndProductTablesv23'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301084524_AddInvoiceAndProductTablesv23', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301093301_AddInvoiceAndProductTablesv24'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301093301_AddInvoiceAndProductTablesv24', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301094504_AddInvoiceAndProductTablesv25'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301094504_AddInvoiceAndProductTablesv25', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250301110212_AddInvoiceAndProductTablesv26'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250301110212_AddInvoiceAndProductTablesv26', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302033331_AddInvoiceAndProductTablesv27'
)
BEGIN
    EXEC sp_rename N'[Invoices].[DateCreated]', N'date_created', 'COLUMN';
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302033331_AddInvoiceAndProductTablesv27'
)
BEGIN
    DECLARE @var5 sysname;
    SELECT @var5 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Products]') AND [c].[name] = N'date_created');
    IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Products] DROP CONSTRAINT [' + @var5 + '];');
    ALTER TABLE [Products] ADD DEFAULT (GETDATE()) FOR [date_created];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302033331_AddInvoiceAndProductTablesv27'
)
BEGIN
    DECLARE @var6 sysname;
    SELECT @var6 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Invoices]') AND [c].[name] = N'date_created');
    IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [Invoices] DROP CONSTRAINT [' + @var6 + '];');
    ALTER TABLE [Invoices] ADD DEFAULT (GETDATE()) FOR [date_created];
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250302033331_AddInvoiceAndProductTablesv27'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250302033331_AddInvoiceAndProductTablesv27', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250304124203_AddInvoiceAndProductTablesv30'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250304124203_AddInvoiceAndProductTablesv30', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250304124442_AddInvoiceAndProductTablesv31'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250304124442_AddInvoiceAndProductTablesv31', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250304131251_AddInvoiceAndProductTablesv32'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250304131251_AddInvoiceAndProductTablesv32', N'9.0.2');
END;

IF NOT EXISTS (
    SELECT * FROM [__EFMigrationsHistory]
    WHERE [MigrationId] = N'20250308111821_AddInvoiceAndProductTablesToAzure1'
)
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250308111821_AddInvoiceAndProductTablesToAzure1', N'9.0.2');
END;

COMMIT;
GO

