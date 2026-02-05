using Inventory.Infrastructure;
using Inventory.Infrastructure.Persistence.Contexts;
using Inventory.Infrastructure.Persistence.Seeds;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<InventoryDbContext>();
    await ContextSeed.SeedAsync(context);
}

app.UseHttpsRedirection();

app.Run();
