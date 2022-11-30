import DefalutModal from './DefalutModal';

function CancelModal({
	openCancelModal,
	setOpenCancelModal,
	handleCancel,
	target,
}) {
	const data = {
		title: `${target} 취소`,
		contents: '정말 취소하시겠습니까?',
		lpbtnTexts: '예',
		pbtnTexts: '아니오',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			subContents={data.subContents}
			lpbtnTexts={data.lpbtnTexts}
			pbtnTexts={data.pbtnTexts}
			setIsOpen={setOpenCancelModal}
			modalIsOpen={openCancelModal}
			onClickLpbtn={handleCancel}
		/>
	);
}

export default CancelModal;
