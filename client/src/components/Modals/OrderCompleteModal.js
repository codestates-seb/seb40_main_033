import DefalutModal from './DefalutModal';

function OrderCompleteModal({
	setIsOpen,
	modalIsOpen,
	onClickPbtn,
	onClickLpbtn,
}) {
	const data = {
		title: 'Order Complete',
		contents: '주문이 완료되었습니다!',
		lpbtnTexts: '주문내역 확인하기',
		pbtnTexts: '다른 상품 보러가기',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			pbtnTexts={data.pbtnTexts}
			lpbtnTexts={data.lpbtnTexts}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
			onClickPbtn={onClickPbtn}
			onClickLpbtn={onClickLpbtn}
		/>
	);
}

export default OrderCompleteModal;
