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

	const { mutate: patchMu } = usePatch(`/reviews/${review.item.reviewId}
	`);

	// 주문내역 상세페이지 - 리뷰 작성
	const { mutate: postMu } = usePost(`/reviews/${review.item.itemOrderId}`);

	const handleStar = useCallback((e) => {
		setStar(e.target.id); // 누른 별만큼 별점 설정
	}, []);

	const handleContent = useCallback(
		(e) => {
			setContent(e.target.value);
		},
		[content],
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (content.length < 20) {
				toast.error('20자 이상 작성해주세요.');
				return;
			}

			// 리뷰 작성 요청
			if (pathname.includes('order')) {
				postMu({ star, content });
				toast.success('리뷰 작성이 완료되었습니다!');
			} else {
				patchMu({ star, content });
				toast.success('리뷰 수정이 완료되었습니다!');
			}
			setIsOpen(false);
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
					quantity={review?.item?.quantity}
					itemId={review?.item?.itemId}
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
