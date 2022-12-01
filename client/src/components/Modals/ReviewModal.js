import { useCallback, useEffect, useState } from 'react';
import DefalutModal from './DefalutModal';
import ReviewForm from '../Forms/ReviewForm';
import BtnStar from '../Stars/BtnStar';
import { usePatch } from '../../hooks/useFetch';

function ReviewModal({ setIsOpen, modalIsOpen, OrderDetailList, review }) {
	const data = {
		title: 'Review',
	};

	const [star, setStar] = useState(review?.star);
	const [content, setContent] = useState(review?.content);

	const { mutate, isLoading, isError, error, response } =
		usePatch(`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/reviews/${review?.reviewId}
	`);
	// console.log(review.reviewId);

	const handleStar = useCallback((e) => {
		setStar(e);
	}, []);

	const handleContent = useCallback((e) => {
		setContent(e.target.value);
	}, []);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		console.log('리뷰 수정 요청');
		mutate({ star, content });
	}, []);

	return (
		<DefalutModal
			title={data.title}
			list={
				<OrderDetailList
					inModal
					brand={review?.item.brand}
					thumbnail={review?.item.thumbnail}
					title={review?.item.title}
					price={review?.item.price}
				/>
			}
			form={
				<ReviewForm
					content={content}
					handleContent={handleContent}
					handleSubmit={handleSubmit}
				/>
			}
			star={<BtnStar star={star} handleStar={handleStar} />}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
		/>
	);
}

export default ReviewModal;
