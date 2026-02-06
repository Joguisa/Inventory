using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Products.Commands.DeleteProduct
{
    public class DeleteProductCommand : IRequest<Response<bool>>
    {
        public int Id { get; set; }
    }
}
