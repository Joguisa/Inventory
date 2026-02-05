using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest<Response<int>>
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public int ReorderLevel { get; set; }
        public int CategoryId { get; set; }
        public int? SupplierId { get; set; }
    }
}
