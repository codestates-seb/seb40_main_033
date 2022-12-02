import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DefalutModal from './DefalutModal';
import ReviewForm from '../Forms/ReviewForm';
import BtnStar from '../Stars/BtnStar';
import { usePatch, usePost } from '../../hooks/useFetch';

function ReviewModal({ setIsOpen, modalIsOpen, OrderDetailList, review }) {
	const data = {
		title: 'Review',
	};
	const { id } = useParams();
	const { pathname } = useLocation();

	const [star, setStar] = useState(review?.star);
	const [content, setContent] = useState(review?.content);

	const {
		mutate: patchMu,
		isLoading: patchIsLoad,
		isError: patchIsErr,
		error: patchErr,
		response: patchRes,
	} = usePatch(`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/reviews/${review?.reviewId}
	`);

	// 상세페이지 - 리뷰 작성
	const {
		mutate: postMu,
		isLoading: postIsLoad,
		isError: postIsErr,
		error: postErr,
		response: postRes,
	} = usePost(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/reviews/${id}`,
	);

	const handleStar = useCallback((e) => {
		setStar(e);
	}, []);

	const handleContent = useCallback((e) => {
		setContent(e.target.value);
	}, []);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		// 상세페이지의 리뷰 작성 요청
		if (pathname.includes('detail')) {
			postMu({ star, content });
			// 리뷰 수정 요청
		} else {
			patchMu({ star, content });
		}
		console.log('리뷰 작성 및 수정 요청');
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
