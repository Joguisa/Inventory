using System.Threading;
using System.Threading.Tasks;
using Inventory.Application.Exceptions;
using Inventory.Application.Wrappers;
using Inventory.Domain.Entities;
using Inventory.Domain.Interfaces;
using MediatR;

namespace Inventory.Application.Features.Products.Commands.DeleteProduct
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Response<bool>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteProductCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<bool>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(request.Id);

            if (product == null)
                throw new ApiException($"Producto no encontrado con el id {request.Id}");

            await _unitOfWork.Repository<Product>().DeleteAsync(product);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new Response<bool>(true, "Producto eliminado correctamente");
        }
    }
}
