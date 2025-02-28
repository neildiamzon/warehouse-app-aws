namespace backend.Model
{
    public class Invoice
    {
        public int Id { get; set; }
        public string invoice_id { get; set; }
        public string invoice_reference_number { get; set; }
        public string user_id { get; set; }
        public string customer_name { get; set; }
        public string shipping_address { get; set; }
        public float total_cost { get; set; }
        public string shipped { get; set; }
        public string invoice_status { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}
