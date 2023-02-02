import { NutritionFact } from './itemList.type';

export interface IMainPageItem {
	itemId: number;
	thumbnail: string;
	title: string;
	content: string;
	capacity: number;
	price: number;
	brand: string;
	nutritionFacts: NutritionFact[];
	starAvg: number;
	reviewSize: number;
}

export interface BestItem {
	data: IMainPageItem[];
	pageInfo?: null;
}

export interface SaleItem {
	data: IMainPageItem[];
	pageInfo?: null;
}

export interface MDpickItem {
	data: IMainPageItem[];
	pageInfo?: null;
}

export interface IMainPage {
	data: {
		data: {
			bestItem: BestItem;
			saleItem: SaleItem;
			mdPickItem: MDpickItem;
		};
	};
}

// export interface RootObject {
// 	data: IMainPage;
// }
