using Inventory.Application.DTOs;
using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Suppliers.Queries.GetSupplierById
{
    public class GetSupplierByIdQuery : IRequest<Response<SupplierDto>>
    {
        public int Id { get; set; }
    }
}
