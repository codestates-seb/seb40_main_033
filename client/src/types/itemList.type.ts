import { ItemShortcutData, NutritionFact } from './item.type';

export interface Item extends ItemShortcutData {
	content: string;
	starAvg: number;
	reviewSize: number;
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
