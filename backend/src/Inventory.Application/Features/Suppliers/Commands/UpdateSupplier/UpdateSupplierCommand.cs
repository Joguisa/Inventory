using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Suppliers.Commands.UpdateSupplier
{
    public class UpdateSupplierCommand : IRequest<Response<bool>>
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ContactEmail { get; set; }
        public string? ContactPhone { get; set; }
        public string? Address { get; set; }
    }
}
