import { CartItem } from './cart.type';

export interface NoteReviewData {
	data: NoteReviewItemWithData[];
	pageInfo: PageInfo;
}

export interface NoteReviewItemWithData {
	reviewId: number;
	userId: number;
	item: NoteReviewItem;
	quantity: number;
	content: string;
	star: number;
	createdAt: Date;
	updatedAt: Date;
}

export type NoteReviewItem = CartItem;

export interface PageInfo {
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
}

export type MyPageReviewListProps = Omit<
	NoteReviewItemWithData,
	'item' | 'updatedAt'
> & {
	itemId: number;
	brand: string;
	thumbnail: string;
	title: string;
	capacity: number;
	nowPrice: number;
	discountRate: number | '';
	beforePrice: number | null;
};
