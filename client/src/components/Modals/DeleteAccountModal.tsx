import DefalutModal from './DefalutModal';
import { ModalWithLightPurpleButtonProps } from '../../types/modal.type';

function DeleteAccountModal({
	setIsModalOpen,
	IsModalOpen,
	onClickLightPurpleButton,
}: ModalWithLightPurpleButtonProps) {
	const data = {
		title: '회원탈퇴',
		contents:
			'탈퇴 시 회원님의 계정에 저장된 모든 정보가 영구적으로 삭제되며, 다시 복구할 수 없어요!\n 해당 계정으로 작성된 글은 자동으로 삭제되지 않으며, 탈퇴 시 수정이나 삭제가 불가능해요!',
		subContents: '이에 동의합니다.',
		lightPurpleButtonTexts: '탈퇴하기',
		purpleButtonTexts: '고민해볼게요',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			subContents={data.subContents}
			lightPurpleButtonTexts={data.lightPurpleButtonTexts}
			purpleButtonTexts={data.purpleButtonTexts}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
			onClickLightPurpleButton={onClickLightPurpleButton}
		/>
	);
}

export default DeleteAccountModal;
