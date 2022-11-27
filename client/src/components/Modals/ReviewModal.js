import DefalutModal from './DefalutModal';
import ReviewForm from '../Forms/ReviewForm';
import BtnStar from '../Stars/BtnStar';

function ReviewModal({ setIsOpen, modalIsOpen, OrderDetailList }) {
	const data = {
		title: 'Review',
	};

	return (
		<DefalutModal
			title={data.title}
			list={<OrderDetailList inModal />}
			form={<ReviewForm />}
			star={<BtnStar />}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
		/>
	);
}

export default ReviewModal;
