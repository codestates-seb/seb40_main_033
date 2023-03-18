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
