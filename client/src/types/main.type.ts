import { NutritionFact } from './itemList.type';

export interface CardItem {
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
	discountPrice: number;
	discountRate: number;
}

export interface ISection {
	data: CardItem[];
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
