using Inventory.Domain.Entities;
using Inventory.Infrastructure.Persistence.Contexts;


namespace Inventory.Infrastructure.Persistence.Seeds
{
    public static class ContextSeed
    {
        public static async Task SeedAsync(InventoryDbContext context)
        {
            if (!context.Users.Any())
            {
                var adminUser = new User
                {
                    Username = "admin",
                    Email = "admin@gmail.com",
                    Role = "Administrator",
                    IsDeleted = false,
                    CreatedBy = "System",
                    CreatedAt = DateTime.UtcNow
                };

                adminUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin");

                await context.Users.AddAsync(adminUser);
                await context.SaveChangesAsync();
            }
        }
    }
}
