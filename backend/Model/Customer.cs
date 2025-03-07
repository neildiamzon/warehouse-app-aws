namespace backend.Model
{
    public class Customer : AppUser
    {
        public string CustomerId { get; set; }

        public string CustomerName { get; set; }

        public string ContactPerson { get; set; }

        public string ShippingAddress { get; set; }

        public string ContactPersonEmail { get; set; }

        public string Organization { get; set; }
    }
}
