using Inventory.Application.Features.Suppliers.Commands.CreateSupplier;
using Inventory.Application.Features.Suppliers.Commands.DeleteSupplier;
using Inventory.Application.Features.Suppliers.Commands.UpdateSupplier;
using Inventory.Application.Features.Suppliers.Queries.GetAllSuppliers;
using Inventory.Application.Features.Suppliers.Queries.GetSupplierById;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Api.Controllers
{
    [Authorize]
    public class SuppliersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await Mediator.Send(new GetAllSuppliersQuery()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await Mediator.Send(new GetSupplierByIdQuery { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateSupplierCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateSupplierCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteSupplierCommand { Id = id }));
        }
    }
}
