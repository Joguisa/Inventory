using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Inventory.Infrastructure.Persistence.Configurations
{
    public class ProductInventoryDetailConfiguration : IEntityTypeConfiguration<ProductInventoryDetail>
    {
        public void Configure(EntityTypeBuilder<ProductInventoryDetail> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.LotNumber)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasOne(p => p.Product)
                .WithMany(product => product.InventoryDetails)
                .HasForeignKey(p => p.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(p => p.Supplier)
                .WithMany()
                .HasForeignKey(p => p.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
