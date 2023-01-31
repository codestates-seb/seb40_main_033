export interface NutritionFact {
	ingredient: string;
	volume: string;
}

export interface IItem {
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

export interface IGetList {
	path: string;
	query: string;
}

export interface IUseGetList extends IGetList {
	pathname: string;
	category: string;
}
export interface IUseGetSearchList extends IGetList {
	pathname: string;
	keyword: string;
}

export interface IFetchCathgoryItems extends IGetList {
	pageParam: number;
	category: string;
}

export interface IFetchSearchItems extends IGetList {
	pageParam: number;
	keyword: string;
}

export interface IInfiniteQueryPromise {
	data: IItem[];
	nextPage: number;
	isLast: boolean;
}
