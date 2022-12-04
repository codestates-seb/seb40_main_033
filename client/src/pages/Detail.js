import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Summary from '../components/ItemSummary/Summary';
import DetailReviewList from '../components/Lists/DetailReviewList';
import DetailTalkList from '../components/Lists/DetailTalkList';
import TalkForm from '../components/Forms/TalkForm';
import { useGet, usePost } from '../hooks/useFetch';
import { LoadingSpinner } from '../components/Etc/LoadingSpinner';

function Detail() {
	// state 초기값 토크 조회값일 수도!

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

	const deliveryInfo = `배송 방법 : 택배 배송
	배송 지역 : 전국
	배송 비용 : 무료
	배송 예정일 : 평일 기준 출고 후 1~2일 소요 (관할 지역 택배사 사정에 따라 추가 소요될 수 있음)

	천재지변, 물량 급증, 수급 변동 등 예외적인 사유 발생 시, 배송이 지연될 수 있는 점 양해 부탁드립니다.
	군부대 일부와 해외의 경우 배송이 어려울 수 있습니다
	
	평일 낮 12시 이전 결제 시 : 당일 출고 (주말 및 공휴일 제외)
	평일 낮 12시 이후 결제 시 : 다음날 출고 (주말 및 공휴일 제외)`;

	const returnInfo = `교환/반품 안내
	- 단순 변심에 의한 교환 / 반품은 제품 수량 후 7일까지 가능하며 왕복 배송비는 고객부담입니다.
	- 상세주소 미입력, 주소지 오기재 등으로 인해 상품이 반송될 경우 왕복 배송비는 고객 부담입니다.
	- 고객 사유로 인한 교환/반품/반송 시 왕복 배송비 5,000원이 발생하며 제주 및 도서산간 지역의 경우 실제 왕복 배송비가 부과됩니다.
	- 상품 불량 및 오배송 등으로 인한 귀책 사유가 있을 경우, 교환/반품 배송비는 와이즐리가 부담합니다.
	
	교환/반품 제한사항
	- 고객의 사용, 시간경과, 제품 소비에 의해 제품의 가치가 현저히 감소한 경우
	- 구성품의 분실, 누락, 파손 혹은 포장이 훼손되어 제품의 가치가 현저히 감소한 경우`;

	const ProductInfo = `상품 유형
	건강기능식품

	유통기한
	${lists.expiration} 까지

	영양 정보
	- 용량 : ${lists.capacity}정 (${lists.capacity / lists.servingSize}일)
	- 영양성분 : ${
		lists &&
		lists?.nutritionFacts.map((fact) => ` ${fact.ingredient} (${fact.volume})`)
	}
	- 1일 섭취량: 1회 ${lists.servingSize}정

	섭취 방법
	1일 1회, 1회 ${lists.servingSize}캡슐을 충분한 물과 함께 섭취하십시오.

	섭취 시 주의사항
	- 질환이 있거나 의약품 복용 시 전문가와 상담하십시오.
	- 알레르기 체질 등은 개인에 따라 과민반응을 나타낼 수 있습니다.
	- 이상사례 발생 시 섭취를 중단하고 전문가와 상담하십시오.
	- 어린이가 함부로 섭취하지 않도록 일일섭취량 방법을 지도하십시오.
	- 강력방습제(실리카겔)는 섭취하지 마십시오.

	보관 방법
	- 수분 및 열에 의해 품질에 영향을 받을 수 있으므로 직사광선을 피해 서늘한 곳에 보관하시고, 어린이 손에 닿지 않는 곳에 보관하십시오.
- 충격에 제품이 깨질 수 있으니 주의하십시오.

	`;

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
						<InfoContent>{ProductInfo}</InfoContent>
					</InfoContainer>
					<InfoContainer>
						<InfoTitle>배송정보</InfoTitle>
						<InfoContent>{deliveryInfo}</InfoContent>
					</InfoContainer>
					<InfoContainer>
						<InfoTitle>교환 및 반품정보</InfoTitle>
						<InfoContent>{returnInfo}</InfoContent>
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
