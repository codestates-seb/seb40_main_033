import DefalutModal from './DefalutModal';
import { ModalCommonProps } from '../../types/modal.type';

function GoodbyeModal({ setIsModalOpen, IsModalOpen }: ModalCommonProps) {
	const data = {
		title: 'Good bye',
		contents: '그동안 감사했습니다.\n 더 나은 서비스로 찾아뵙겠습니다.',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
			autoClose
			path="/"
		/>
	);
}

export default GoodbyeModal;
