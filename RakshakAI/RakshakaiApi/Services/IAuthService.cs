using RakshakaiApi.DTOs;
using RakshakaiApi.Models;

namespace RakshakaiApi.Services
{
    public interface IAuthService
    {
        Task<LoginResponse?> AuthenticateAsync(string username, string password);
        string GenerateJwtToken(User user);
        Task<bool> RegisterUserAsync(string username, string password, string name, string role);
    }
}