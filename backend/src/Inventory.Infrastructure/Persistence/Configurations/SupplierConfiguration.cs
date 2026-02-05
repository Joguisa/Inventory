using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Inventory.Infrastructure.Persistence.Configurations
{
    public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
    {
        public void Configure(EntityTypeBuilder<Supplier> builder)
        {
            builder.HasKey(s => s.Id);

            builder.Property(s => s.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(s => s.ContactEmail)
                .HasMaxLength(100);

            builder.Property(s => s.ContactPhone)
                .HasMaxLength(20);
            
            builder.Property(s => s.Address)
                .HasMaxLength(250);

            builder.Property(s => s.CreatedBy).HasMaxLength(50);
            builder.Property(s => s.LastModifiedBy).HasMaxLength(50);
        }
    }
}
