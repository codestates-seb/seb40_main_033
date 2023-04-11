import { ReactNode } from 'react';
import Modal from 'react-modal';

export interface DefaultModalProps {
	title: string;
	list: JSX.Element;
	form: JSX.Element;
	star: JSX.Element;
	contents: string;
	subContents: string;
	lpbtnTexts: string;
	pbtnTexts: string;
	IsModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	path: string; // 모달 닫았을 때 이동할 경로
	onClickPbtn: React.MouseEventHandler<HTMLButtonElement>; // 버튼에 넣고 싶은 onClick 함수
	onClickLpbtn: React.MouseEventHandler<HTMLButtonElement>;
	autoClose: boolean;
	children: ReactNode;
}

export interface ReactModalAdapterProps {
	className?: string;
	IsModalOpen: boolean;
	children: ReactNode;
	isDelay: boolean;
	afterOpenModal: Modal.OnAfterOpenCallback;
	closeModal: () => void;
}
