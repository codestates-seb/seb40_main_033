import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefalutModal from './DefalutModal';
import ReviewForm from '../Forms/ReviewForm';
import BtnStar from '../Stars/BtnStar';
import { usePatch, usePost } from '../../hooks/useFetch';
import { ReviewModalProps } from '../../types/modal.type';
import {
	WRITE_MORE_THAN_20_CHARACTERS,
	WRITE_COMPLETE,
	UPDATE_COMPLETE,
} from '../Etc/Constants';

function ReviewModal({
	setIsModalOpen,
	IsModalOpen,
	List,
	review,
}: ReviewModalProps) {
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

	const handleStar: React.MouseEventHandler<SVGElement> = useCallback((e) => {
		setStar(e.currentTarget.id); // 누른 별만큼 별점 설정
	}, []);

	const handleContent: React.ChangeEventHandler<HTMLTextAreaElement> =
		useCallback(
			(e) => {
				setContent(e.target.value);
			},
			[content],
		);

	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
		(e) => {
			e.preventDefault();
			if (content.length < 20) {
				toast.error(WRITE_MORE_THAN_20_CHARACTERS);
				return;
			}

			// 리뷰 작성 요청
			if (pathname.includes('order')) {
				postMu({ star, content });
				toast.success(WRITE_COMPLETE);
			} else {
				patchMu({ star, content });
				toast.success(UPDATE_COMPLETE);
			}
			setIsModalOpen(false);
		},
		[star, content],
	);

	return (
		<DefalutModal
			title={data.title}
			list={
				<List
					inModal
					brand={review?.item.brand}
					thumbnail={review?.item.thumbnail}
					title={review?.item.title}
					nowPrice={review?.item.nowPrice}
					beforePrice={review?.item.beforePrice}
					discountRate={review?.item.discountRate}
					itemOrderId={review?.item.itemOrderId ?? 0}
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
			star={<BtnStar star={String(star)} handleStar={handleStar} />}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
		/>
	);
}

export default ReviewModal;
