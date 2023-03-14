export interface NutritionFact {
	ingredient: string;
	volume: string;
}

export interface Item {
	itemId: number;
	thumbnail: string;
	title: string;
	content: string;
	capacity: number;
	price: number;
	discountRate: number;
	discountPrice: number;
	starAvg: number;
	reviewSize: number;
	brand: string;
	nutritionFacts: NutritionFact[];
}

// for hooks & APIs

export interface GetList {
	path: string;
	query: string;
}

export interface UseGetList extends GetList {
	pathname: string;
	category: string;
}
export interface UseGetSearchList extends GetList {
	pathname: string;
	keyword: string;
}

export interface FetchCathgoryItems extends GetList {
	pageParam: number;
	category: string;
}

export interface FetchSearchItems extends GetList {
	pageParam: number;
	keyword: string;
}

export interface InfiniteQueryPromise {
	data: Item[];
	nextPage: number;
	isLast: boolean;
}
