import { ItemShortcutData } from './item.type';
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

export interface OrderDetailListProps {
	inModal?: boolean;
	itemOrderId: number;
	itemId: number;
	brand: string;
	thumbnail: string;
	title: string;
	quantity: number;
	nowPrice: number;
	discountRate: number;
	beforePrice: number;
	period: number;
	subscription: boolean;
	capacity: number;
	orderStatus: string;
}

export interface OrderDetailData {
	data: PayData;
}
