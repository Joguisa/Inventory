using System.Threading;
using System.Threading.Tasks;
using Inventory.Application.Exceptions;
using Inventory.Application.Wrappers;
using Inventory.Domain.Entities;
using Inventory.Domain.Interfaces;
using MediatR;

namespace Inventory.Application.Features.Categories.Commands.DeleteCategory
{
    public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Response<int>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteCategoryCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<int>> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Repository<Category>().GetByIdAsync(request.Id);

            if (category == null)
            {
                throw new ApiException($"Categoría no encontrada con Id: {request.Id}");
            }

            await _unitOfWork.Repository<Category>().DeleteAsync(category);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new Response<int>(category.Id, "Categoría eliminada correctamente");
        }
    }
}
