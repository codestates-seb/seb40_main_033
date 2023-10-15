import { ItemShortcutData, CartItems, CartItemWithData } from './item.type';

export interface CartData {
	data: {
		cartId: number;
		subscription: boolean;
		itemCarts: CartItems;
		totalItems: number;
		totalPrice: number;
		totalDiscountPrice: number;
		expectPrice: number;
	};
}

export interface CartListProps {
	data: CartItemWithData;
	item: ItemShortcutData;
	sub?: boolean;
}
