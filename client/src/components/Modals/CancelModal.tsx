import DefalutModal from './DefalutModal';
import { CancelModalProps } from '../../types/modal.type';

function CancelModal({
	setIsModalOpen,
	IsModalOpen,
	onClickLightPurpleButton,
	target,
}: CancelModalProps) {
	const data = {
		title: `${target}${target === '장바구니' ? '에서 삭제' : ' 취소'}`,
		contents: `정말 ${target === '장바구니' ? '삭제' : '취소'}하시겠습니까?`,
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

export default CancelModal;
