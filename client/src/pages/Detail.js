import styled, { keyframes, css } from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { useCallback, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import Summary from '../components/ItemSummary/Summary';
import DetailReviewList from '../components/Lists/DetailReviewList';
import DetailTalkList from '../components/Lists/DetailTalkList';
import TalkForm from '../components/Forms/TalkForm';
import { useGet, usePost } from '../hooks/useFetch';
import {
	DeliveryInfo,
	ReturnInfo,
	ProductInfo,
} from '../components/Etc/Constants';
import { LoadingSpinner } from '../components/Etc/LoadingSpinner';

function Detail() {
	const { pathname } = useLocation();
	const { id } = useParams();
	const reviewRef = useRef(null);
	const token = localStorage.getItem('accessToken');
	const [content, setContent] = useState(''); // 토크 컨텐츠!
	const [isTalkOpen, setIsTalkOpen] = useState(false);
	// 토크 폼 닫을 때 애니메이션 효과를 위한 상태
	const [isDelay, setIsDelay] = useState(true);

	// arrow 아이콘 클릭 시 토크 폼 오픈
	const handleOpenTalkForm = useCallback(() => {
		// 열려있으면?
		if (isTalkOpen) {
			setIsDelay(true); // 0.3초 딜레이 후에
			setTimeout(() => setIsTalkOpen(false), 300); // 종료
			// 닫혀있으면?
		} else {
			setIsTalkOpen(true);
			setIsDelay(false);
		}
	}, [isTalkOpen, isDelay]);

	// summary 속 별점 클릭 시 하단 리뷰 섹션으로 이동
	const handleMoveToReview = () => {
		reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	// 상품 상세 조회
	const { isLoading, isError, data, error } = useGet(`/items/${id}`, pathname);

	// 토크 작성
	const { mutate: talkMu } = usePost(`/talks/${id}`);

	// 토크 작성 요청
	const handleSubmit = useCallback(() => {
		if (content.length < 20) {
			toast.error('20자 이상 작성해주세요.');
			return;
		}
		talkMu({ content });
		setContent('');
		setIsTalkOpen(false);
		setIsDelay(true);
		// setTimeout(() => setIsTalkOpen(false), 300);
	}, [content]);

	// 토크 컨텐츠 상태
	const handleContent = useCallback(
		(e) => {
			setContent(e.target.value);
		},
		[content],
	);
	const lists = !isLoading && data.data.data;
	if (isLoading) {
		return (
			<DetailContainer className="loading">
				<LoadingSpinner />
			</DetailContainer>
		);
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
					<Notes ref={reviewRef}>
						<InfoTitle>Review</InfoTitle>
						<ListsContainer>
							{lists.reviews.data.length !== 0 ? (
								lists.reviews.data.map((review) => (
									<DetailReviewList
										key={`${review.reviewId}-review`}
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
												capacity: lists.capacity,
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
							<TalkFormContainer isDelay={isDelay}>
								<TalkFormOpenBtn isDelay={isDelay} onClick={handleOpenTalkForm}>
									<IoIosArrowBack className={isDelay && 'delay'} />
									토크 작성하기
								</TalkFormOpenBtn>
								{isTalkOpen && (
									<TalkForm
										content={content}
										handleContent={handleContent}
										handleSubmit={handleSubmit}
									/>
								)}
							</TalkFormContainer>
						)}
						<ListsContainer className="talk">
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
									</>
								))
							) : (
								<NoNote>작성된 토크가 없습니다.</NoNote>
							)}
						</ListsContainer>
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
						handleMoveToReview={handleMoveToReview}
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
	&.loading {
		height: 490px;
		justify-content: center;
		align-items: center;
	}
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

const Notes = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 70px;
	width: 100%;
	margin-top: 100px;
	&.talk {
		> :nth-child(2) {
			margin-bottom: 30px;
		}
	}
`;

// 열릴 때 화살표 위로
const rotateArrow = keyframes`
	0% {
		transform: rotate(-90deg);
	}
	100% {
		transform: rotate(-270deg);
	}
`;

// 닫힐 때 화살표 아래로
const rotateArrowReverse = keyframes`
	0% {
		transform: rotate(-270deg);
	}
	100% {
		transform: rotate(-90deg);
	}
`;

const slideIn = keyframes`
	0% {
		opacity: 0%;
		transform: translateY(-50px)
	}
	50% {
		opacity: 10%;
	}
	100% {
		opacity: 100;
		transform: translateY(0)
	}
`;

const slideOut = keyframes`
	0% {
		opacity: 80%;
	}
	50% {
		opacity: 10%;
	}
	100% {
		opacity: 0%;
		transform: translateY(-50px);
	}
`;

const TalkFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;

	// 토크 폼
	& > :nth-child(2) {
		margin-bottom: 10px;
		${({ isDelay }) =>
			!isDelay // 딜레이가 아님 === 열림
				? css`
						animation: ${slideIn} 0.3s ease;
				  `
				: css`
						animation: ${slideOut} 0.3s ease;
				  `};
	}
`;

const TalkFormOpenBtn = styled.div`
	display: flex;
	align-items: center;
	color: var(--purple-200);
	justify-content: center;
	cursor: pointer;
	user-select: none;

	* {
		cursor: pointer;
	}

	// 토크 폼 여는 버튼
	svg {
		align-self: flex-end;
		font-size: 16px;
		margin-right: 6px;
		cursor: pointer;
		transform: rotate(-90deg);

		path {
			color: var(--purple-200);
		}

		${({ isDelay }) =>
			!isDelay // delay false, open true
				? css`
						animation: ${rotateArrow} 0.18s ease-in-out;
						transform: rotate(90deg);
				  `
				: css`
						// delay true, open false
						animation: ${rotateArrowReverse} 0.18s ease-in-out;
						transform: rotate(-90deg);
				  `};
	}
`;

const ListsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

// 작성글이 없을 경우
const NoNote = styled.div`
	display: flex;
	align-items: center;
	height: 250px;
`;

export default Detail;
