using System;

namespace Inventory.Application.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ReorderLevel { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public List<ProductInventoryDetailDto> InventoryDetails { get; set; } = new();
    }
}
