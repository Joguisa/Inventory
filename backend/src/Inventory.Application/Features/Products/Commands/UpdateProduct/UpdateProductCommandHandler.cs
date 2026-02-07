using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Inventory.Application.Exceptions;
using Inventory.Application.Wrappers;
using Inventory.Domain.Entities;
using Inventory.Domain.Enums;
using Inventory.Domain.Interfaces;
using MediatR;

namespace Inventory.Application.Features.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Response<bool>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateProductCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Response<bool>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(request.Id, p => p.InventoryDetails);
            
            if (product == null)
                throw new ApiException($"Producto no encontrado con el id {request.Id}");

            product.Name = request.Name;
            product.Description = request.Description;
            product.ReorderLevel = request.ReorderLevel;
            product.CategoryId = request.CategoryId;
            
            var existingDetails = product.InventoryDetails.ToList();
            foreach (var detail in existingDetails)
            {
                await _unitOfWork.Repository<ProductInventoryDetail>().DeleteAsync(detail);
            }
            product.InventoryDetails.Clear();

            foreach (var detailCommand in request.InventoryDetails)
            {
                var newDetail = _mapper.Map<ProductInventoryDetail>(detailCommand);
                product.InventoryDetails.Add(newDetail);

                // TODO: registrar ajuste si hay stock
                var transaction = new InventoryTransaction
                {
                    ProductId = product.Id,
                    TransactionType = TransactionType.Adjustment,
                    Quantity = newDetail.Stock,
                    TransactionDate = DateTime.UtcNow,
                    Reference = "Edición de Producto"
                };

                await _unitOfWork.Repository<InventoryTransaction>().AddAsync(transaction);
            }

            await _unitOfWork.Repository<Product>().UpdateAsync(product);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new Response<bool>(true, "Producto actualizado correctamente");
        }
    }
}
