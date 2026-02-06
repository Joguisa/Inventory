using System.Threading;
using System.Threading.Tasks;
using Inventory.Application.Exceptions;
using Inventory.Application.Wrappers;
using Inventory.Domain.Entities;
using Inventory.Domain.Interfaces;
using MediatR;

namespace Inventory.Application.Features.Suppliers.Commands.DeleteSupplier
{
    public class DeleteSupplierCommandHandler : IRequestHandler<DeleteSupplierCommand, Response<bool>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteSupplierCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<bool>> Handle(DeleteSupplierCommand request, CancellationToken cancellationToken)
        {
            var supplier = await _unitOfWork.Repository<Supplier>().GetByIdAsync(request.Id);

            if (supplier == null)
            {
                throw new ApiException($"Proveedor no encontrado con el id {request.Id}");
            }

            await _unitOfWork.Repository<Supplier>().DeleteAsync(supplier);
            await _unitOfWork.SaveChangesAsync();

            return new Response<bool>(true);
        }
    }
}
