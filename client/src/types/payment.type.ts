import { ItemShortcutData } from './item.type';

interface ItemOrder {
	createdAt: string;
	item: ItemShortcutData;
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
