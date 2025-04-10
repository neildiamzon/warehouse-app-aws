using Amazon.SimpleSystemsManagement;
using Amazon.SimpleSystemsManagement.Model;
using Amazon.Extensions.NETCore.Setup;
using backend;
using backend.Database;
using backend.Model;
using backend.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var awsOptions = builder.Configuration.GetAWSOptions();
var ssmClient = awsOptions.CreateServiceClient<IAmazonSimpleSystemsManagement>();

var responseUserDb = await ssmClient.GetParameterAsync(new GetParameterRequest
{
    Name = "/warehouse-app/local/db/connectionstring/userdb",
    WithDecryption = true
}); 

builder.Configuration["ConnectionStrings:WarehouseUserDbConnection"] = responseUserDb.Parameter.Value;

var responseWarehouseDb = await ssmClient.GetParameterAsync(new GetParameterRequest
{
    Name = "/warehouse-app/local/db/connectionstring/warehousedb",
    WithDecryption = true
});

builder.Configuration["ConnectionStrings:WarehouseDbConnection"] = responseWarehouseDb.Parameter.Value;

builder.Services.AddDefaultAWSOptions(awsOptions);
builder.Services.AddAWSService<IAmazonSimpleSystemsManagement>();

Console.WriteLine("AWS VALUE: " + builder.Configuration.GetConnectionString("WarehouseConnection"));
// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")  // React app URL, replace with your frontend's URL
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // Allow credentials (cookies, headers, etc.)
    });
});

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });
            ;
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IInvoiceService, InvoiceService>();
builder.Services.AddScoped<IInvoiceRepository, InvoiceRepository>();
builder.Services.AddScoped<IInventoryManagementService, InventoryManagementService>();
builder.Services.AddScoped<IInventoryManagementRepository, InventoryManagementRepository>();
builder.Services.AddScoped<IUserManagementRepository, UserManagementRepository>();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// Register the UserDbContext for Identity
builder.Services.AddDbContext<UserDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WarehouseUserDbConnection")));

// Register Identity with the custom AppUser class
builder.Services.AddIdentity<AppUser, IdentityRole>()
    .AddEntityFrameworkStores<UserDbContext>()
    .AddDefaultTokenProviders();

// Register the DbContext for Invoices and Products
builder.Services.AddDbContext<WarehouseDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WarehouseDbConnection")));

// Register DatabaseInitializer
builder.Services.AddScoped<DatabaseInitializer>();

builder.Services.AddControllersWithViews();
var app = builder.Build();

app.UseCors("AllowReactApp");

// Initialize roles and admin user and seed data
using (var scope = app.Services.CreateScope())
{
    // Apply migrations first
    var warehouseDb = scope.ServiceProvider.GetRequiredService<WarehouseDbContext>();
    var userDb = scope.ServiceProvider.GetRequiredService<UserDbContext>();
    await userDb.Database.MigrateAsync();
    await warehouseDb.Database.MigrateAsync();

    var initializer = scope.ServiceProvider.GetRequiredService<DatabaseInitializer>();
    var tempDbContext = scope.ServiceProvider.GetRequiredService<WarehouseDbContext>();
    await initializer.InitializeAsync(tempDbContext);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
