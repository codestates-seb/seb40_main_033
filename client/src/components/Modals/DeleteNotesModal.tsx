import DefalutModal from './DefalutModal';
import { ModalWithLpbtnProps } from '../../types/modal.type';

function DeleteNotesModal({
	setIsModalOpen,
	IsModalOpen,
	onClickLpbtn,
}: ModalWithLpbtnProps) {
	const data = {
		title: '작성글 삭제',
		contents: '정말 삭제하시겠습니까?',
		lpbtnTexts: '예',
		pbtnTexts: '아니오',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			lpbtnTexts={data.lpbtnTexts}
			pbtnTexts={data.pbtnTexts}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
			onClickLpbtn={onClickLpbtn}
		/>
	);
}

export default DeleteNotesModal;
