using System.Collections.Generic;
using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Products.Commands.UpdateProduct
{
    public class UpdateProductCommand : IRequest<Response<bool>>
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ReorderLevel { get; set; }
        public int CategoryId { get; set; }
        public List<UpdateProductInventoryDetailCommand> InventoryDetails { get; set; } = new();
    }

    public class UpdateProductInventoryDetailCommand
    {
        public int SupplierId { get; set; }
        public string LotNumber { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}
