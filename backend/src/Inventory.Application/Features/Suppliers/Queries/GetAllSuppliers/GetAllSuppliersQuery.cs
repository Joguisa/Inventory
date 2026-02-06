using System.Collections.Generic;
using Inventory.Application.DTOs;
using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Suppliers.Queries.GetAllSuppliers
{
    public class GetAllSuppliersQuery : IRequest<Response<IEnumerable<SupplierDto>>>
    {
    }
}
