import { Item } from './itemList.type';

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

export interface CartItems {
	data: CartItemWithData[];
	pageInfo: null;
}

export interface CartItemWithData {
	itemCartId: number;
	quantity: number;
	period: number;
	buyNow: boolean;
	subscription: boolean;
	item: CartItem;
	createdAt: Date;
	updatedAt: Date;
}

export type CartItem = Omit<
	Item,
	'content' | 'starAvg' | 'reviewSize' | 'nutritionFacts' | 'discountPrice'
> & {
	disCountPrice: number;
};

export interface CartListProps {
	data: CartItemWithData;
	item: CartItem;
	sub?: boolean;
}
