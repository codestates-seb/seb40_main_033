import DefalutModal from './DefalutModal';
import PayList from '../Lists/MyPageLists/PayList';
import UpdateTalkForm from '../Forms/UpdateTalkForm';

// 토크 수정 모달
function TalkModal({ setIsOpen, modalIsOpen }) {
	const data = {
		title: 'Talk',
	};

	return (
		<DefalutModal
			title={data.title}
			list={<PayList />}
			form={<UpdateTalkForm />}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
		/>
	);
}

export default TalkModal;
