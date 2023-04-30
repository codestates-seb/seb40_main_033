import { ItemShortcutData, ItemDefaultData } from './item.type';
import { PayData } from './payment.type';

export interface UseGetOrderListProps {
	pathname: string;
	isSub: boolean;
}

export interface FetchOrderListsProps {
	pageParam: number;
	isSub: boolean;
}

export interface OrderListData {
	createdAt: Date;
	expectPrice: number;
	item: ItemShortcutData;
	orderId: number;
	orderStatus: string;
	subscription: boolean;
	totalItems: number;
	updatedAt: Date;
}

export interface OrderDetailListProps extends ItemDefaultData {
	inModal?: boolean;
	itemOrderId: number;
	quantity?: number;
	nowPrice: number;
	discountRate: number | boolean;
	beforePrice: number | boolean;
	period?: number;
	subscription?: boolean;
	capacity?: number;
	orderStatus?: string;
}

export interface OrderDetailData {
	data: PayData;
}

export interface SubscriptedItemOrder {
	item: ItemShortcutData;
	itemOrderId: number;
	nextDelivery: string;
	orderId: number;
	period: number;
	quantity: number;
	totalPrice: number;
}
