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

export interface ISection {
	data: IMainPageItem[];
	pageInfo?: null;
}

export interface IMainPage {
	data: {
		data: {
			bestItem: ISection;
			saleItem: ISection;
			mdPickItem: ISection;
		};
	};
}

// export interface RootObject {
// 	data: IMainPage;
// }
