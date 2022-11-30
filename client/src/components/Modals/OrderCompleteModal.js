import DefalutModal from './DefalutModal';

/*
	<modal 여는 버튼이 있는 컴포넌트에 필요한 상태 및 함수>

	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	버튼에 openModal 함수를 달아주셔야 합니다.
	ex)) <LetterButton onClick={openModal}>버튼</LetterButton>
*/

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
