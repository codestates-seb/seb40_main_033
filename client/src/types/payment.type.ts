interface Item {
	brand: string;
	capacity: number;
	disCountPrice: number;
	discountRate: number;
	itemId: number;
	price: number;
	thumbnail: string;
	title: string;
}

interface ItemOrder {
	createdAt: string;
	item: Item;
	itemOrderId: number;
	period: number;
	quantity: number;
	subscription: boolean;
	updatedAt: string;
}

export interface PayData {
	address: string;
	createdAt: string;
	detailAddress: string;
	expectPrice: number;
	itemOrders: { data: ItemOrder[] };
	name: string;
	orderId: number;
	orderStatus: string;
	phone: string;
	subscription: boolean;
	totalDiscountPrice: number;
	totalItems: number;
	totalPrice: number;
	totalQuantity: number;
	updatedAt: string;
}

export interface ShoppingListProps {
	isSub: boolean;
	talk: boolean;
	brand: string;
	thumbnail: string;
	title: string;
	price: number;
	capacity: number;
	quantity: number;
	discountRate: number;
	beforePrice: number;
	period: number;
	itemId?: number;
}
