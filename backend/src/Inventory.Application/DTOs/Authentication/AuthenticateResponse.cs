using System.Collections.Generic;

namespace Inventory.Application.DTOs.Authentication
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<string> Roles { get; set; } = new List<string>();
        public bool IsVerified { get; set; }
        public string JWToken { get; set; } = string.Empty;
    }
}
