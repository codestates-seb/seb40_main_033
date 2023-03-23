import { CartItem } from './cart.type';

// review
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

// talk
export interface NoteTalkData {
	data: NoteTalkItemWithData[];
	pageInfo: PageInfo;
}

export type NoteTalkItemWithData = Omit<
	NoteReviewItemWithData,
	'reviewId' | 'userId' | 'star'
> & {
	talkId: number;
	talkCommentId: number;
	reply: boolean;
};

export interface MyPageTalkListProps {
	talk: NoteTalkItemWithData;
	isReply: boolean;
}
