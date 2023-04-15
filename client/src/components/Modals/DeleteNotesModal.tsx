import DefalutModal from './DefalutModal';
import { ModalWithLightPurpleButtonProps } from '../../types/modal.type';

function DeleteNotesModal({
	setIsModalOpen,
	IsModalOpen,
	onClickLightPurpleButton,
}: ModalWithLightPurpleButtonProps) {
	const data = {
		title: '작성글 삭제',
		contents: '정말 삭제하시겠습니까?',
		lightPurpleButtonTexts: '예',
		purpleButtonTexts: '아니오',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			lightPurpleButtonTexts={data.lightPurpleButtonTexts}
			purpleButtonTexts={data.purpleButtonTexts}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
			onClickLightPurpleButton={onClickLightPurpleButton}
		/>
	);
}

export default DeleteNotesModal;
