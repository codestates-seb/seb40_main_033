import { ItemShortcutData } from './item.type';
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

export type NoteReviewItem = ItemShortcutData;

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

// 상세페이지 리뷰
export interface DetailReviewsData {
	data: Reviews[];
	pageInfo: PageInfo;
}

interface Reviews extends NoteCommonEl {
	itemId: number;
	reviewId: number;
	star: number;
}

export interface DetailTalksData {
	data: Talks[];
	pageInfo: PageInfo;
}

interface Talks extends NoteCommonEl {
	itemId: number;
	shopper: boolean;
	talkComments: TalkComments[];
	talkId: number;
}

interface TalkComments extends NoteCommonEl {
	shopper: boolean;
	talkCommentId: number;
}

// 상세페이지 리뷰, 토크, 토크코멘트 공통 요소
interface NoteCommonEl {
	content: string;
	createAt: string;
	displayName: string;
	updateAt: string;
	userId: number;
}
