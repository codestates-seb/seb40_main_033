import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefalutModal from './DefalutModal';
import ReviewForm from '../Forms/ReviewForm';
import BtnStar from '../Stars/BtnStar';
import { usePatch, usePost } from '../../hooks/useFetch';

function ReviewModal({ setIsOpen, modalIsOpen, OrderDetailList, review }) {
	const data = {
		title: 'Review',
	};

	const { pathname } = useLocation();
	const [star, setStar] = useState(review.item.star || '');
	const [content, setContent] = useState(review.item.content || ''); // 내용

	const {
		mutate: patchMu,
		isLoading: patchIsLoad,
		isError: patchIsErr,
		error: patchErr,
		response: patchRes,
	} = usePatch(`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/reviews/${review.item.reviewId}
	`);

	// 주문내역 상세페이지 - 리뷰 작성
	const {
		mutate: postMu,
		isLoading: postIsLoad,
		isError: postIsErr,
		error: postErr,
		response: postRes,
	} = usePost(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/reviews/${review.item.itemOrderId}`,
	);
	console.log('review', review);

	const handleStar = useCallback((e) => {
		setStar(e.target.id); // 누른 별만큼 별점 설정
		console.log('별점:', e.target.id);
	}, []);

	const handleContent = useCallback(
		(e) => {
			setContent(e.target.value);
			console.log('내용:', e.target.value);
		},
		[content],
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			console.log('제출', { content, star });
			// 마이페이지- 주문내역상세페이지 리뷰 작성 요청
			if (content.length < 20) {
				toast.error('20자 이상 작성해주세요.');
				return;
			}
			if (pathname.includes('order')) {
				postMu({ star, content });
				console.log(postRes);
				// 리뷰 수정 요청
			} else {
				patchMu({ star, content });
				console.log(patchRes);
			}
			setIsOpen(false);
			console.log('리뷰 작성 및 수정 요청');
		},
		[star, content],
	);

	return (
		<DefalutModal
			title={data.title}
			list={
				<OrderDetailList
					inModal
					brand={review?.item.brand}
					thumbnail={review?.item.thumbnail}
					title={review?.item.title}
					nowPrice={review?.item.nowPrice}
					beforePrice={review?.item.beforePrice}
					discountRate={review?.item.discountRate}
					itemOrderId={review?.item.itemOrderId}
					capacity={review?.item?.capacity}
					quantity={review?.quantity}
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
