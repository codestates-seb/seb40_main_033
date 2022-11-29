import DefalutModal from './DefalutModal';

// 이미 장바구니에 있는 상품입니다. or 장바구니에 상품이 담겼습니다.
function CartModal({ setOpenModal, openModal, contents, onClickPbtn }) {
	const data = {
		title: 'Complete',
		contents,
		pbtnTexts: '장바구니로 가기',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			pbtnTexts={data.pbtnTexts}
			setIsOpen={setOpenModal}
			modalIsOpen={openModal}
			onClickPbtn={onClickPbtn}
			autoClose
		/>
	);
}

export default CartModal;
