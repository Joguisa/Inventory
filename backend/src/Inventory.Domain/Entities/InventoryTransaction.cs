using System;
using Inventory.Domain.Enums;

namespace Inventory.Domain.Entities
{
    public class InventoryTransaction : BaseEntity
    {
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public TransactionType TransactionType { get; set; }
        public int Quantity { get; set; }
        public DateTime TransactionDate { get; set; }
        
        public string? Reference { get; set; }
    }
}
