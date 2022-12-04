import DefalutModal from './DefalutModal';

function LoginModal({ setIsOpen, modalIsOpen, onClickPbtn }) {
	const data = {
		title: 'Please Login',
		contents: '로그인이 필요한 서비스입니다.',
		pbtnTexts: '로그인 하러가기',
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

export default LoginModal;
