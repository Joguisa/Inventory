export interface InventoryDetail {
    id?: number;
    supplierId: number;
    supplierName?: string;
    lotNumber: string;
    price: number;
    stock: number;
}

export interface Product {
    id?: number;
    name: string;
    description?: string;
    inventoryDetails: InventoryDetail[];
}
