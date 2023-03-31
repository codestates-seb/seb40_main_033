export interface ItemShortcutData {
	brand: string;
	capacity: number;
	discountPrice: number;
	discountRate: number;
	itemId: number;
	price: number;
	thumbnail: string;
	title: string;
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
	item: ItemShortcutData;
	createdAt: Date;
	updatedAt: Date;
}

export interface NutritionFact {
	ingredient: string;
	volume: string;
}
