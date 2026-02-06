using System.Collections.Generic;
using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest<Response<int>>
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ReorderLevel { get; set; }
        public int CategoryId { get; set; }
        public List<CreateProductInventoryDetailCommand> InventoryDetails { get; set; } = new();
    }

    public class CreateProductInventoryDetailCommand
    {
        public int SupplierId { get; set; }
        public string LotNumber { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}
