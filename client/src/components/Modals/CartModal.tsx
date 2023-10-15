import DefalutModal from './DefalutModal';
import { ModalWithPurpleButtonProps } from '../../types/modal.type';

function CartModal({
	setIsModalOpen,
	IsModalOpen,
	onClickPurpleButton,
}: ModalWithPurpleButtonProps) {
	const data = {
		title: 'Complete',
		contents: '장바구니에 상품이 담겼습니다.',
		purpleButtonTexts: '장바구니로 가기',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			purpleButtonTexts={data.purpleButtonTexts}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
			onClickPurpleButton={onClickPurpleButton}
			autoClose
		/>
	);
}

export default CartModal;
