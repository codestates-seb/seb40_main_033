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

function WelcomeModal({ setIsOpen, modalIsOpen }) {
	const data = {
		title: 'Welcome',
		contents: '회원가입이 완료되었습니다!',
		pbtnTexts: '회원가입 하러가기',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			pbtnTexts={data.pbtnTexts}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
		/>
	);
}

export default WelcomeModal;
