using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Suppliers.Commands.DeleteSupplier
{
    public class DeleteSupplierCommand : IRequest<Response<bool>>
    {
        public int Id { get; set; }
    }
}
