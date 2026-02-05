using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Categories.Commands.CreateCategory
{
    public class CreateCategoryCommand : IRequest<Response<int>>
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
