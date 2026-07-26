export interface OrderItem {
    readonly productName: string;
    readonly quantity: number;
    readonly price: number;
}

export interface CreateOrderDto {
    readonly customerName: string;
    readonly items: OrderItem[];
}

export interface OrderDto {
    readonly customerName: string;
    readonly items: OrderItem[];
    readonly total: number;
    readonly id: string;
}
