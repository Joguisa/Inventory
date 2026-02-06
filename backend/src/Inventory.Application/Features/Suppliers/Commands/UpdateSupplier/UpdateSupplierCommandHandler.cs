using System.Threading;
using System.Threading.Tasks;
using Inventory.Application.Exceptions;
using Inventory.Application.Wrappers;
using Inventory.Domain.Entities;
using Inventory.Domain.Interfaces;
using MediatR;

namespace Inventory.Application.Features.Suppliers.Commands.UpdateSupplier
{
    public class UpdateSupplierCommandHandler : IRequestHandler<UpdateSupplierCommand, Response<bool>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateSupplierCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<bool>> Handle(UpdateSupplierCommand request, CancellationToken cancellationToken)
        {
            var supplier = await _unitOfWork.Repository<Supplier>().GetByIdAsync(request.Id);

            if (supplier == null)
            {
                throw new ApiException($"Proveedor no encontrado con el id {request.Id}");
            }

            supplier.Name = request.Name;
            supplier.ContactEmail = request.ContactEmail;
            supplier.ContactPhone = request.ContactPhone;
            supplier.Address = request.Address;

            await _unitOfWork.Repository<Supplier>().UpdateAsync(supplier);
            await _unitOfWork.SaveChangesAsync();

            return new Response<bool>(true);
        }
    }
}
