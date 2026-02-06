using Inventory.Application.Wrappers;
using MediatR;

namespace Inventory.Application.Features.Suppliers.Commands.CreateSupplier
{
    public class CreateSupplierCommand : IRequest<Response<int>>
    {
        public string Name { get; set; } = string.Empty;
        public string? ContactEmail { get; set; }
        public string? ContactPhone { get; set; }
        public string? Address { get; set; }
    }
}
