import { ItemShortcutData } from './item.type';

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
