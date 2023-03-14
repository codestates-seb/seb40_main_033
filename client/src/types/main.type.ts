import { CustomArrowProps } from 'react-slick';
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

export interface Section {
	data: CardItem[];
	pageInfo?: null;
}

export interface MainPage {
	data: {
		data: {
			bestItem: Section;
			saleItem: Section;
			mdPickItem: Section;
		};
	};
}

export interface CustomArrow extends CustomArrowProps {
	left?: boolean;
	right?: boolean;
}

export interface MainCaroucelInfo {
	type: string;
	title: string[];
	description: string[];
	color: string;
	link: string;
}
