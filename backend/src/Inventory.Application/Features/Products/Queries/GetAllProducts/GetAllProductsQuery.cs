using System.Collections.Generic;
using Inventory.Application.DTOs;
using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Products.Queries.GetAllProducts
{
    public class GetAllProductsQuery : IRequest<Response<IEnumerable<ProductDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
