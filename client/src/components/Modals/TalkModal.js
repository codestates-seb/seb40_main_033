import DefalutModal from './DefalutModal';
import PayList from '../Lists/MyPageLists/PayList';
import TalkForm from '../Forms/TalkForm';

function TalkModal({ setIsOpen, modalIsOpen }) {
	const data = {
		title: 'Review',
	};

	return (
		<DefalutModal
			title={data.title}
			list={<PayList />}
			form={<TalkForm />}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
		/>
	);
}

export default TalkModal;
