import { ReactNode } from 'react';
import Modal from 'react-modal';
import { NoteTalkItemWithData } from './note.type';
import { ItemDefaultData } from './item.type';
import { OrderDetailListProps } from './order.type';

export interface ModalCommonProps {
	IsModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DefaultModalProps extends ModalCommonProps {
	title?: string;
	list?: JSX.Element;
	form?: JSX.Element;
	star?: JSX.Element;
	contents?: string;
	subContents?: string;
	lightPurpleButtonTexts?: string;
	purpleButtonTexts?: string;
	path?: string; // 모달 닫았을 때 이동할 경로
	onClickPurpleButton?: React.MouseEventHandler<HTMLButtonElement>; // 버튼에 넣고 싶은 onClick 함수
	onClickLightPurpleButton?: React.MouseEventHandler<HTMLButtonElement>;
	autoClose?: boolean;
	children?: ReactNode;
}

export interface ReactModalAdapterProps {
	className?: string;
	IsModalOpen: boolean;
	children: ReactNode;
	isDelay: boolean;
	afterOpenModal: Modal.OnAfterOpenCallback;
	closeModal: () => void;
}

export interface AddressModalProps extends ModalCommonProps {
	children: ReactNode;
}

export interface ModalWithPurpleButtonProps extends ModalCommonProps {
	onClickPurpleButton: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ModalWithLightPurpleButtonProps extends ModalCommonProps {
	onClickLightPurpleButton: React.MouseEventHandler<HTMLButtonElement>;
}

export interface CancelModalProps extends ModalWithLightPurpleButtonProps {
	target: string;
}

export type OrderCompleteModalProps = ModalWithPurpleButtonProps &
	ModalWithLightPurpleButtonProps;

export interface ReviewModalProps extends ModalCommonProps {
	List: ({
		inModal,
		brand,
		thumbnail,
		title,
		nowPrice,
		beforePrice,
		discountRate,
		itemOrderId,
		capacity,
		quantity,
		period,
		subscription,
		orderStatus,
		itemId,
	}: OrderDetailListProps) => JSX.Element;
	review: { item: ReviewItemFromOrderDetailList };
}

interface ReviewItemFromOrderDetailList extends ItemDefaultData {
	itemOrderId?: number | undefined;
	capacity?: number;
	quantity?: number;
	reviewId?: number;
	content?: string;
	star?: number;
	userId?: number;
	nowPrice: number;
	beforePrice: number | boolean;
	discountRate: number | boolean;
}

export interface TalkModalProps extends ModalCommonProps {
	talk: NoteTalkItemWithData;
}
