using System.Collections.Generic;
using Inventory.Application.DTOs;
using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Categories.Queries.GetAllCategories
{
    public class GetAllCategoriesQuery : IRequest<Response<IEnumerable<CategoryDto>>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
