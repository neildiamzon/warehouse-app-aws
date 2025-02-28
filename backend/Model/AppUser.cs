
using Microsoft.AspNetCore.Identity;

namespace backend.Model
{
    public class AppUser : IdentityUser
    {
        public String UserId { get; set; }
    }
}
