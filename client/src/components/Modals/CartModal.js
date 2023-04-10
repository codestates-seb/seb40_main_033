import DefalutModal from './DefalutModal';

function CartModal({ setIsOpen, modalIsOpen, onClickPbtn }) {
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
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
			onClickPbtn={onClickPbtn}
			autoClose
		/>
	);
}

export default CartModal;
