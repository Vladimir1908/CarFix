namespace CarFix.Domain.Models.Inventory
{
    public class InventoryDto
    {
        public int Id { get; set; }
        public string PartName { get; set; } = string.Empty;
        public string PartCode { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Supplier { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public bool IsActive { get; set; }
    }
}
