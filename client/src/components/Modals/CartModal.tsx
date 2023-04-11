import DefalutModal from './DefalutModal';
import { ModalWithPbtnProps } from '../../types/modal.type';

function CartModal({
	setIsModalOpen,
	IsModalOpen,
	onClickPbtn,
}: ModalWithPbtnProps) {
	const data = {
		title: 'Complete',
		contents: '장바구니에 상품이 담겼습니다.',
		pbtnTexts: '장바구니로 가기',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			pbtnTexts={data.pbtnTexts}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
			onClickPbtn={onClickPbtn}
			autoClose
		/>
	);
}

export default CartModal;
