import { useMutation, useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '../../components/Etc/Pagination';
import MyPageReviewList from '../../components/Lists/MyPageLists/MyPageReviewList';
import { useGet, usePatch } from '../../hooks/useFetch';

// 작성글 관리 - 리뷰
function NoteReview() {
	const { pathname } = useLocation();
	const { isLoading, isError, data, error } = useGet(
		// 'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/reviews/mypage',
		'http://localhost:3001/reviews',
		pathname,
	);
	const reviews = data?.data?.data;

	return (
		<>
			{isLoading ? (
				!isError && <div>Loading</div>
			) : (
				<ListContainer>
					{reviews.map((review) => (
						<MyPageReviewList key={review.reviewId} review={review} />
					))}
				</ListContainer>
			)}
			{isError && <div>{error.message}</div>}
			<Pagination total="10" limit="8" />
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
`;

export default NoteReview;
