import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { useCallback, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Summary from '../components/ItemSummary/Summary';
import DetailReviewList from '../components/Lists/DetailReviewList';
import DetailTalkList from '../components/Lists/DetailTalkList';
import TalkForm from '../components/Forms/TalkForm';
import { useGet, usePost } from '../hooks/useFetch';
import { LoadingSpinner } from '../components/Etc/LoadingSpinner';
import {
	DeliveryInfo,
	ReturnInfo,
	ProductInfo,
} from '../components/Etc/ItemDetailInfo';

function Detail() {
	// state 초기값 토크 조회값일 수도!
	const ref = useRef();
	const { pathname } = useLocation();
	const { id } = useParams();
	const token = localStorage.getItem('accessToken');
	const { isLoading, isError, data, error } = useGet(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/items/${id}`,
		pathname,
	);

	// 토크 작성
	const { mutate: talkMu, response } = usePost(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/talks/${id}`,
	);

	const [content, setContent] = useState(''); // 토크 컨텐츠!

	// 토크 작성 요청
	const handleSubmit = useCallback(
		(e) => {
			if (content.length < 20) {
				toast.error('20자 이상 작성해주세요.');
				return;
			}
			talkMu({ content });
			console.log('response', response);
			setContent('');
		},
		[content],
	);

	// 토크 컨텐츠 상태
	const handleContent = useCallback(
		(e) => {
			setContent(e.target.value);
		},
		[content],
	);
	const lists = !isLoading && data.data.data;
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<DetailContainer>
			<>
				<Contents key={lists.itemId}>
					<Image
						src={lists.thumbnail}
						alt="상품 대표사진"
						className="thumbnail"
					/>
					<Image src={lists.descriptionImage} alt="상품 상세사진" />
					<InfoContainer>
						<InfoTitle>상품정보</InfoTitle>
						<ProductInfo
							expiration={lists.expiration}
							capacity={lists.capacity}
							servingSize={lists.servingSize}
							nutritionFacts={lists.nutritionFacts}
						/>
					</InfoContainer>
					<InfoContainer>
						<InfoTitle>배송정보</InfoTitle>
						<DeliveryInfo />
					</InfoContainer>
					<InfoContainer>
						<InfoTitle>교환 및 반품정보</InfoTitle>
						<ReturnInfo />
					</InfoContainer>
					<Notes>
						<InfoTitle>Review</InfoTitle>
						<ListsContainer>
							{lists.reviews.data.length !== 0 ? (
								lists.reviews.data.map((review) => (
									<DetailReviewList
										key={review.reviewId}
										itemId={review.itemId}
										star={review.star}
										displayName={review.displayName}
										createdAt={review.createdAt}
										content={review.content}
										userId={review.userId}
										review={{
											item: {
												reviewId: review.reviewId,
												userId: review.userId,
												itemId: review.itemId,
												content: review.content,
												brand: lists.brand,
												thumbnail: lists.thumbnail,
												title: lists.title,
												nowPrice: lists.discountPrice || lists.price,
												discountRate:
													lists.discountRate === 0 ? '' : lists.discountRate,
												beforePrice: lists.discountPrice ? lists.price : null,
												star: review.star,
											},
										}}
									/>
								))
							) : (
								<NoNote>작성된 리뷰가 없습니다.</NoNote>
							)}
						</ListsContainer>
					</Notes>
					<Notes className="talk">
						<InfoTitle>Talk</InfoTitle>
						{token && (
							<TalkForm
								content={content}
								handleContent={handleContent}
								handleSubmit={handleSubmit}
							/>
						)}
						{lists.talks.data.length !== 0 ? (
							lists.talks.data.map((talk) => (
								<>
									<DetailTalkList
										key={talk.talkId}
										itemId={talk.itemId}
										createdAt={talk.createdAt}
										content={talk.content}
										userId={talk.userId}
										talkId={talk.talkId}
										shopper={talk.shopper}
										displayName={talk.displayName}
									/>
									{talk.talkComments &&
										talk.talkComments.map((retalk) => {
											return (
												<DetailTalkList
													key={`${retalk.talkCommentId.toString()}-retalk`}
													talkCommentId={retalk.talkCommentId}
													reTalkContent={retalk.content}
													createdAt={retalk.createdAt}
													shopper={retalk.shopper}
													displayName={retalk.displayName}
													userId={retalk.userId}
													isReply
												/>
											);
										})}
									{/* <DetailTalkList {...talk.talkComments.map(retalk => content={retalk.content}
										)} /> */}
								</>
							))
						) : (
							<NoNote>작성된 토크가 없습니다.</NoNote>
						)}
						<ListsContainer className="talk" />
					</Notes>
				</Contents>
				<SummaryContainer>
					<Summary
						itemId={lists.itemId}
						name={lists.title}
						brand={lists.brand}
						categories={lists.categories}
						content={lists.content}
						nowPrice={lists.discountPrice || lists.price}
						discountRate={lists.discountRate === 0 ? '' : lists.discountRate}
						beforePrice={lists.discountPrice ? lists.price : null}
						starAvg={lists.starAvg}
						reviewCount={lists.reviews.data.length}
					/>
				</SummaryContainer>
			</>
		</DetailContainer>
	);
}

const DetailContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	position: relative;
`;

const SummaryContainer = styled.div`
	width: 45%;
	display: flex;
	justify-content: center;
	position: relative;
`;

const Image = styled.img`
	width: 100%;
	&.thumbnail {
		width: 570px;
		margin-bottom: 120px;
	}
`;

const Contents = styled.div`
	width: 55%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 50px;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 150px;
`;

const InfoTitle = styled.h2`
	display: flex;
	font-size: 20px;
	padding-bottom: 20px;
	margin-bottom: 30px;
	border-bottom: 1px solid #f1f1f1;
	width: 100%;
	align-self: start;
`;

const InfoContent = styled.pre`
	white-space: pre-line;
	font-size: 15px;
	line-height: 1.5;
	color: var(--gray-400);
`;

const Notes = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 70px;
	width: 100%;
	margin-top: 100px;
	&.talk {
		> :nth-child(2) {
			margin-bottom: 44px;
		}
		/* margin-bottom: 20px; */
	}
`;

const ListsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	&.talk {
		> :nth-child(1) {
			margin-top: 40px;
		}
	}
`;

const NoNote = styled.div`
	display: flex;
	align-items: center;
	height: 250px;
`; // 작성글이 없을 경우

export default Detail;
