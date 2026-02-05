using Inventory.Domain.Entities;
using Inventory.Infrastructure.Persistence.Contexts;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

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

                var passwordHasher = new PasswordHasher<User>();

                adminUser.PasswordHash = passwordHasher.HashPassword(
                    adminUser,
                    "admin"
                );

                await context.Users.AddAsync(adminUser);
                await context.SaveChangesAsync();
            }
        }
    }
}
