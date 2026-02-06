using FluentValidation;

namespace Inventory.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty().WithMessage("{PropertyName} es requerido.")
                .NotNull()
                .MaximumLength(100).WithMessage("{PropertyName} no debe exceder 100 caracteres.");

            RuleFor(p => p.CategoryId)
                .GreaterThan(0).WithMessage("{PropertyName} debe ser un ID válido.");

            RuleFor(p => p.InventoryDetails)
                .NotEmpty().WithMessage("Al menos un detalle de inventario es requerido.");
        }
    }
}
