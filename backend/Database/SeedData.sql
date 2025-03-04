INSERT INTO [dbo].[Invoices] 
    ([invoice_id], [invoice_reference_number], [user_id], [customer_name], 
     [shipping_address], [total_cost], [shipped], [invoice_status], [date_created])
VALUES
    ('INV-001', 'REF-001', 'USR-1001', 'Kai Xander', 'Sector 47, Neon District, New Auckland, NZ', 130.50, 'No', 'Pending', GETDATE()),
    ('INV-002', 'REF-002', 'USR-1002', 'Juno Voss', 'Skyline Tower, 45 Cyber Lane, NeoWellington, NZ', 91.00, 'Yes', 'Shipped', GETDATE()),
    ('INV-003', 'REF-003', 'USR-1003', 'Milo Axon', 'Zone 9, Arcadia Heights, CyberChristchurch, NZ', 160.00, 'No', 'Processing', GETDATE()),
    ('INV-004', 'REF-004', 'USR-1004', 'Lyra Nyx', 'Echo Spire, 89 Dark Alley, New Hamilton, NZ', 115.00, 'No', 'Pending', GETDATE()),
    ('INV-005', 'REF-005', 'USR-1005', 'Dante Syn', 'Neon Citadel, 23 Chrome Street, CyberDunedin, NZ', 75.50, 'Yes', 'Shipped', GETDATE()),
    ('INV-006', 'REF-006', 'USR-1006', 'Seraphina Raze', 'Data Vault, 12 Quantum Road, Tauranga TechZone, NZ', 200.00, 'No', 'Pending', GETDATE()),
    ('INV-007', 'REF-007', 'USR-1007', 'Orion Nova', 'Black Market District, 34 ByteLane, Napier Neon Sprawl, NZ', 50.00, 'Yes', 'Shipped', GETDATE()),
    ('INV-008', 'REF-008', 'USR-1008', 'Aria Crowe', 'Rogue Sector, 78 Neon Pulse, Palmerston North, NZ', 140.00, 'No', 'Processing', GETDATE()),
    ('INV-009', 'REF-009', 'USR-1009', 'Luca Vox', 'DustZone, 56 SteelBridge, NewNelson, NZ', 85.00, 'No', 'Pending', GETDATE()),
    ('INV-010', 'REF-010', 'USR-1010', 'Cassius Steele', 'Crimson Tower, 90 Neon Blvd, InverCiti, NZ', 175.00, 'Yes', 'Shipped', GETDATE()),
    ('INV-011', 'REF-011', 'USR-1011', 'Kaelen Blaze', 'Midnight Spire, 90 Broadway St, Neon InveCity, NZ', 115.00, 'Yes', 'Shipped', GETDATE()),
    ('INV-012', 'REF-012', 'USR-1011', 'Raven Drift', 'Deep Sector, 90 Starlight Road, Arcadia InverTech, NZ', 35.00, 'Yes', 'Shipped', GETDATE());

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
	 ('P001', 'Neon Pulse', 'High-powered energy cell for neon lights and cybernetic implants', 152.99, 0.7, 'kg', 15, 250, GETDATE()),
	 ('P002', 'SynthShine', 'Bio-enhanced polish for chrome surfaces and synthetic skin', 22.99, 0.7, 'kg', 15, 250, GETDATE()),
	 ('P003', 'Chromaflex', 'Adaptive armor flex with integrated nanotech fibers', 11.99, 0.7, 'kg', 15, 250, GETDATE()),
	 ('P004', 'RazorTech Blade', 'Electroshock blade for close combat and defense', 112.99, 0.7, 'kg', 15, 250, GETDATE()),
	 ('P005', 'VoltCore', 'Portable battery pack with high output for cybernetic upgrades', 12.99, 0.7, 'kg', 15, 250, GETDATE()),
	 ('P006', 'NeuroLink Chip', 'Cognitive enhancement module for direct neural interface', 24.99, 1.2, 'piece', 1, 80, GETDATE()),
	 ('P007', 'CyberPulse Gel', 'Healing gel for cybernetic wounds and skin restoration', 8.99, 0.3, 'kg', 10, 500, GETDATE()),
	 ('P008', 'TechnoBox', 'Smart storage unit with auto-sorting and retrieval system', 99.99, 5.0, 'box', 1, 20, GETDATE()),
	 ('P009', 'Liquid SynthFuel', 'High-grade fuel for enhanced cybernetic energy systems', 18.49, 0.6, 'liters', 2, 150, GETDATE()),
	 ('P010', 'PlasmaPack', 'Energy pack for portable plasma weapons and power systems', 45.99, 2.5, 'pack', 1, 60, GETDATE()),
	 ('P011', 'NanoBites', 'Nanotechnology-based sustenance for cyber-enhanced humans', 5.99, 0.2, 'piece', 1, 1000, GETDATE()),
	 ('P012', 'BioStimulant', 'Genetic accelerator for increasing physical and neural response times', 39.99, 1.8, 'kg', 12, 110, GETDATE()),
	 ('P013', 'NeuroBox', 'Compact module for brain-computer interface expansion', 55.99, 3.2, 'box', 1, 30, GETDATE()),
	 ('P014', 'HyperLiquid', 'Fuel for high-performance vehicles and mechs', 21.99, 1.0, 'liters', 2, 200, GETDATE()),
	 ('P015', 'TechPack', 'Multi-functional pack for portable cyber upgrades and repair', 7.49, 0.4, 'pack', 5, 400, GETDATE()),
	 ('P016', 'EchoChip', 'Data storage and processing chip for advanced AI systems', 29.99, 1.3, 'piece', 1, 90, GETDATE()),
	 ('P017', 'FusionStrands', 'Reinforced cables for energy transmission in cybernetic augmentations', 14.99, 0.5, 'kg', 8, 350, GETDATE()),
	 ('P018', 'StealthBox', 'High-tech box that absorbs and redirects light for stealth operations', 64.99, 4.5, 'box', 1, 25, GETDATE()),
	 ('P019', 'FusionPack', 'Fusion-powered backpack for enhanced mobility and energy storage', 32.99, 2.1, 'kg', 6, 75, GETDATE()),
	 ('P020', 'LiquidElectro', 'Conductive liquid for cybernetic enhancements and repairs', 9.99, 0.9, 'liters', 3, 180, GETDATE());



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