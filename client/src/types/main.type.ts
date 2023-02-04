import { CustomArrowProps } from 'react-slick';
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
	discountPrice: number;
	discountRate: number;
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

export interface ICustomArrowProps extends CustomArrowProps {
	left?: boolean;
	right?: boolean;
}

export interface IMainCaroucelInfo {
	type: string;
	title: string[];
	description: string[];
	color: string;
	link: string;
}
