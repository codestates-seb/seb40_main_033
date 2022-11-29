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

function GoodbyeModal({ setIsOpen, modalIsOpen }) {
	const data = {
		title: 'Good bye',
		contents: '그동안 감사했습니다.\n 더 나은 서비스로 찾아뵙겠습니다.',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
			autoClose
			path="/"
		/>
	);
}

export default GoodbyeModal;
