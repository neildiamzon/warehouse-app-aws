namespace backend.Model.Response
{
    public class ResponseUsers
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string ContactPerson { get; set; }
        public string ShippingAddress { get; set; }
        public string ContactPersonEmail { get; set; }
        public string Organization { get; set; }

    }
}
