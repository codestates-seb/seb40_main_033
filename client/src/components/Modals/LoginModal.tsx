import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DefalutModal from './DefalutModal';
import { ModalCommonProps } from '../../types/modal.type';

function LoginModal({ setIsModalOpen, IsModalOpen }: ModalCommonProps) {
	const navigate = useNavigate();
	const data = {
		title: 'Please Login',
		contents: '로그인이 필요한 서비스입니다.',
		purpleButtonTexts: '로그인 하러가기',
	};

	const handleLoginMove = useCallback(() => {
		navigate('/login');
	}, []);

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			purpleButtonTexts={data.purpleButtonTexts}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
			onClickPurpleButton={handleLoginMove}
			autoClose
		/>
	);
}

export default LoginModal;
