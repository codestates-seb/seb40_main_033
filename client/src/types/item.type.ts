export interface ItemDefaultData {
	itemId: number;
	brand: string;
	thumbnail: string;
	title: string;
}

export interface ItemShortcutData extends ItemDefaultData {
	capacity: number;
	discountPrice: number;
	discountRate: number;
	price: number;
}

export interface ShoppingListProps extends ItemDefaultData {
	isSub?: boolean;
	talk: boolean;
	price: number;
	capacity: number;
	quantity?: number;
	discountRate: number;
	beforePrice: number | boolean;
	period?: number;
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

export interface DetailProductInfoProps {
	expiration: string;
	capacity: number;
	servingSize: number;
	nutritionFacts: NutritionFact[];
}
