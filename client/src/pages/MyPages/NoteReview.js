/* eslint-disable react/style-prop-object */
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';
// import Pagination from '../../components/Etc/Pagination';
import MyPageReviewList from '../../components/Lists/MyPageLists/MyPageReviewList';
import { useGet } from '../../hooks/useFetch';

// 작성글 관리 - 리뷰
function NoteReview() {
	const { pathname } = useLocation();
	const { isLoading, isError, data, error } = useGet(
		'/reviews/mypage',
		pathname,
	);
	const lists = data?.data?.data;

	if (isLoading) return <LoadingSpinner />;
	if (isError) return <div>{error.message}</div>;

	return (
		<>
			<ListContainer>
				{lists.length === 0 ? (
					<div className="blank">작성하신 리뷰가 없습니다.</div>
				) : (
					lists?.map((list) => (
						<MyPageReviewList
							key={list.reviewId}
							createdAt={list.createdAt}
							content={list.content}
							quantity={list.quantity}
							reviewId={list.reviewId}
							star={list.star}
							userId={list.userId}
							itemId={list.item.itemId}
							brand={list.item.brand}
							thumbnail={list.item.thumbnail}
							title={list.item.title}
							capacity={list.item.capacity}
							nowPrice={list.item.disCountPrice || list.item.price}
							discountRate={
								list.item.discountRate === 0 ? '' : list.item.discountRate
							}
							beforePrice={list.item.disCountPrice ? list.item.price : null}
						/>
					))
				)}
			</ListContainer>
			{/* <Pagination total="10" limit="8" /> */}
		</>
	);
}

const ListContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4px;
	margin: 25px 0 75px 0;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	width: 872px;

	& > {
		:last-child {
			border: none;
		}
	}

	.blank {
		height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}
`;

export default NoteReview;
