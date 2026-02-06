using System.Threading.Tasks;
using Inventory.Application.DTOs.Authentication;
using Inventory.Application.Wrappers;

namespace Inventory.Application.Interfaces
{
    public interface IAccountService
    {
        Task<Response<AuthenticateResponse>> AuthenticateAsync(AuthenticateRequest request);
    }
}
