using System.Collections.Generic;

namespace Inventory.Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public int ReorderLevel { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public int? SupplierId { get; set; }
        public Supplier? Supplier { get; set; }

        public ICollection<InventoryTransaction> InventoryTransactions { get; set; } = new List<InventoryTransaction>();
    }
}
