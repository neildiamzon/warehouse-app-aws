

INSERT INTO [dbo].[Invoices] 
    ([invoice_id], [invoice_reference_number], [user_id], [customer_name], 
     [shipping_address], [total_cost], [shipped], [invoice_status], [DateCreated])
VALUES
    ('INV-001', 'REF-001', 'USR-1001', 'John Doe', '123 Elm St, Wellington, NZ', 130.50, 'No', 'Pending', GETDATE()),
    ('INV-002', 'REF-002', 'USR-1002', 'Jane Smith', '45 High St, Auckland, NZ', 91.00, 'Yes', 'Shipped', GETDATE()),
    ('INV-003', 'REF-003', 'USR-1003', 'Michael Johnson', '67 Queen St, Christchurch, NZ', 160.00, 'No', 'Processing', GETDATE()),
    ('INV-004', 'REF-004', 'USR-1004', 'Emily Brown', '89 King St, Hamilton, NZ', 115.00, 'No', 'Pending', GETDATE()),
    ('INV-005', 'REF-005', 'USR-1005', 'Daniel Wilson', '23 Victoria St, Dunedin, NZ', 75.50, 'Yes', 'Shipped', GETDATE()),
    ('INV-006', 'REF-006', 'USR-1006', 'Sophia Martinez', '12 George St, Tauranga, NZ', 200.00, 'No', 'Pending', GETDATE()),
    ('INV-007', 'REF-007', 'USR-1007', 'Oliver Lee', '34 Shortland St, Napier, NZ', 50.00, 'Yes', 'Shipped', GETDATE()),
    ('INV-008', 'REF-008', 'USR-1008', 'Emma Harris', '78 Manners St, Palmerston North, NZ', 140.00, 'No', 'Processing', GETDATE()),
    ('INV-009', 'REF-009', 'USR-1009', 'Liam Robinson', '56 Featherston St, Nelson, NZ', 85.00, 'No', 'Pending', GETDATE()),
    ('INV-010', 'REF-010', 'USR-1010', 'Charlotte White', '90 Broadway, Invercargill, NZ', 175.00, 'Yes', 'Shipped', GETDATE()),
	
    ('INV-011', 'REF-011', 'USR-1011', 'Charlotte Black', '90 Broadway, Invercargill, NZ', 115.00, 'Yes', 'Shipped', GETDATE()),
	
    ('INV-012', 'REF-012', 'USR-1011', 'Charlotte Brown', '90 Broadway, Invercargill, NZ', 35.00, 'Yes', 'Shipped', GETDATE());


-- Batch insert products
INSERT INTO [dbo].[Products]
           ([product_code]
           ,[name]
           ,[description]
           ,[price]
           ,[weight]
           ,[uom]
           ,[quantity_per_uom]
           ,[stock_level]
           ,[date_created])
     VALUES
	 ('P001', 'Product 1', 'Description of Product 1', 152.99, 0.7, 'kg', 15, 250, GETDATE()),
	 ('P002', 'Product 2', 'Description of Product 2', 22.99, 0.7, 'kg', 15, 250, GETDATE()),
	 ('P003', 'Product 3', 'Description of Product 3', 11.99, 0.7, 'kg', 15, 250, GETDATE()),
			('P004', 'Product 4', 'Description of Product 4', 112.99, 0.7, 'kg', 15, 250, GETDATE()),
           ('P005', 'Product 5', 'Description of Product 5', 12.99, 0.7, 'kg', 15, 250, GETDATE()),
           ('P006', 'Product 6', 'Description of Product 6', 24.99, 1.2, 'piece', 1, 80, GETDATE()),
           ('P007', 'Product 7', 'Description of Product 7', 8.99, 0.3, 'kg', 10, 500, GETDATE()),
           ('P008', 'Product 8', 'Description of Product 8', 99.99, 5.0, 'box', 1, 20, GETDATE()),
           ('P009', 'Product 9', 'Description of Product 9', 18.49, 0.6, 'liters', 2, 150, GETDATE()),
           ('P010', 'Product 10', 'Description of Product 10', 45.99, 2.5, 'pack', 1, 60, GETDATE()),
           ('P011', 'Product 11', 'Description of Product 11', 5.99, 0.2, 'piece', 1, 1000, GETDATE()),
           ('P012', 'Product 12', 'Description of Product 12', 39.99, 1.8, 'kg', 12, 110, GETDATE()),
           ('P013', 'Product 13', 'Description of Product 13', 55.99, 3.2, 'box', 1, 30, GETDATE()),
           ('P014', 'Product 14', 'Description of Product 14', 21.99, 1.0, 'liters', 2, 200, GETDATE()),
           ('P015', 'Product 15', 'Description of Product 15', 7.49, 0.4, 'pack', 5, 400, GETDATE()),
           ('P016', 'Product 16', 'Description of Product 16', 29.99, 1.3, 'piece', 1, 90, GETDATE()),
           ('P017', 'Product 17', 'Description of Product 17', 14.99, 0.5, 'kg', 8, 350, GETDATE()),
           ('P018', 'Product 18', 'Description of Product 18', 64.99, 4.5, 'box', 1, 25, GETDATE()),
           ('P019', 'Product 19', 'Description of Product 19', 32.99, 2.1, 'kg', 6, 75, GETDATE()),
           ('P020', 'Product 20', 'Description of Product 20', 9.99, 0.9, 'liters', 3, 180, GETDATE());


-- Batch insert InvoiceProducts ensuring unique (InvoiceId, ProductCode) pairs
INSERT INTO [dbo].[InvoiceProducts] 
           ([invoice_id]
           ,[product_code]
           ,[quantity]
           ,[unit_price]
           ,[total_price])
     VALUES
           -- Invoice INV-008
           ('INV-008', 'P001', 2, 29.99, 59.98),
           ('INV-008', 'P002', 1, 15.49, 15.49),
           ('INV-008', 'P003', 1, 49.99, 49.99),

           -- Invoice INV-009
           ('INV-009', 'P004', 5, 10.99, 54.95),
           ('INV-009', 'P002', 3, 15.49, 46.47),
           ('INV-009', 'P003', 2, 49.99, 99.98),

           -- Invoice INV-010
           ('INV-010', 'P001', 4, 29.99, 119.96),
           ('INV-010', 'P002', 2, 15.49, 30.98),
           ('INV-010', 'P004', 6, 10.99, 65.94),

           -- Invoice INV-011
           ('INV-011', 'P003', 3, 49.99, 149.97),
           ('INV-011', 'P004', 2, 10.99, 21.98),
           ('INV-011', 'P001', 1, 29.99, 29.99),

           -- Invoice INV-012
           ('INV-012', 'P002', 2, 15.49, 30.98),
           ('INV-012', 'P003', 3, 49.99, 149.97),
           ('INV-012', 'P004', 4, 10.99, 43.96)