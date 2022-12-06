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

function DeleteNotesModal({
	openDeleteModal,
	setOpenDeleteModal,
	handleDelete,
}) {
	const data = {
		title: '작성글 삭제',
		contents: '정말 삭제하시겠습니까?',
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
			setIsOpen={setOpenDeleteModal}
			modalIsOpen={openDeleteModal}
			onClickLpbtn={handleDelete}
		/>
	);
}

export default DeleteNotesModal;
