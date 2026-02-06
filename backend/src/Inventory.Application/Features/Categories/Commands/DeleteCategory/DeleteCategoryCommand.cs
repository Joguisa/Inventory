using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Categories.Commands.DeleteCategory
{
    public class DeleteCategoryCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
    }
}
