using Inventory.Infrastructure.Persistence.Contexts;
using Inventory.Infrastructure.Persistence.Seeds;
using Microsoft.EntityFrameworkCore;
using Inventory.Api.Middlewares;

namespace Inventory.Api.Extensions;

public static class AppExtensions
{
    public static void UseErrorHandlingMiddleware(this IApplicationBuilder app)
    {
        app.UseMiddleware<ErrorHandlerMiddleware>();
    }

    public static async Task UseDbInitialization(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<InventoryDbContext>();
        await context.Database.MigrateAsync();
        await ContextSeed.SeedAsync(context);
    }
}
