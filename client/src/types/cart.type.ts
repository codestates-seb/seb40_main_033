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
	data: {
		itemCartId: number;
		quantity: number;
		period: number;
		buyNow: boolean;
		subscription: boolean;
		item: CartItem;
		createdAt: Date;
		updatedAt: Date;
	}[];
	pageInfo: null;
}

export type CartItem = Omit<
	Item,
	'content' | 'starAvg' | 'reviewSize' | 'nutritionFacts'
>;
