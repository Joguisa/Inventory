using System.Threading.Tasks;
using Inventory.Application.Features.Products.Commands.CreateProduct;
using Inventory.Application.Features.Products.Queries.GetAllProducts;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;

namespace Inventory.Api.Controllers
{
    [Authorize]
    public class ProductsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GetAllProductsQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProductCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}
