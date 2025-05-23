﻿using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class Employee : AppUser
    {
        public int EmployeeId { get; set; }

        public string FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
