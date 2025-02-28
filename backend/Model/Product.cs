namespace backend.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float price { get; set; }
        public double weight { get; set; }
        public int uom { get; set; }
        public int QuantityPerUOM { get; set; }
        public int StockLevel { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}
