using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Inventory.Application.Exceptions;
using Inventory.Application.Wrappers;
using Inventory.Domain.Entities;
using Inventory.Domain.Interfaces;
using MediatR;

namespace Inventory.Application.Features.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, Response<int>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateCategoryCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Response<int>> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Repository<Category>().GetByIdAsync(request.Id);

            if (category == null)
            {
                throw new ApiException($"Categoría no encontrada con Id: {request.Id}");
            }
            else
            {
                category.Name = request.Name;
                category.Description = request.Description;

                await _unitOfWork.Repository<Category>().UpdateAsync(category);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                return new Response<int>(category.Id, "Categoría actualizada correctamente");
            }
        }
    }
}
