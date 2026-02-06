namespace Inventory.Domain.Entities
{
    public class ProductInventoryDetail : BaseEntity
    {
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int SupplierId { get; set; }
        public Supplier? Supplier { get; set; }

        public string LotNumber { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}
