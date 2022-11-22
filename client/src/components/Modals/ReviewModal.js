import DefalutModal from './DefalutModal';
import PayList from '../Lists/MyPageLists/PayList';
import ReviewForm from '../Forms/ReviewForm';
import BtnStar from '../Stars/BtnStar';

function ReviewModal({ setIsOpen, modalIsOpen }) {
	const data = {
		title: 'Review',
	};

	return (
		<DefalutModal
			title={data.title}
			list={<PayList />}
			form={<ReviewForm />}
			star={<BtnStar />}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
		/>
	);
}

export default ReviewModal;
