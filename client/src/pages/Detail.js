import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useQueryClient, useQuery } from 'react-query';
import Summary from '../components/ItemSummary/Summary';
import DetailReviewList from '../components/Lists/DetailReviewList';
import TalkForm from '../components/Forms/TalkForm';
import ReviewForm from '../components/Forms/ReviewForm';

function Detail() {
	const queryClient = useQueryClient();

	const deliveryInfo = `
	배송 방법 : 택배 배송
	배송 지역 : 전국
	배송 비용 : 무료
	배송 예정일 : 평일 기준 출고 후 1~2일 소요 (관할 지역 택배사 사정에 따라 추가 소요될 수 있음)

	천재지변, 물량 급증, 수급 변동 등 예외적인 사유 발생 시, 배송이 지연될 수 있는 점 양해 부탁드립니다.
	군부대 일부와 해외의 경우 배송이 어려울 수 있습니다
	
	평일 낮 12시 이전 결제 시 : 당일 출고 (주말 및 공휴일 제외)
	평일 낮 12시 이후 결제 시 : 다음날 출고 (주말 및 공휴일 제외)`;

	const returnInfo = `
	교환/반품 안내
	- 단순 변심에 의한 교환 / 반품은 제품 수량 후 7일까지 가능하며 왕복 배송비는 고객부담입니다.
	- 상세주소 미입력, 주소지 오기재 등으로 인해 상품이 반송될 경우 왕복 배송비는 고객 부담입니다.
	- 고객 사유로 인한 교환/반품/반송 시 왕복 배송비 5,000원이 발생하며 제주 및 도서산간 지역의 경우 실제 왕복 배송비가 부과됩니다.
	- 상품 불량 및 오배송 등으로 인한 귀책 사유가 있을 경우, 교환/반품 배송비는 와이즐리가 부담합니다.
	
	교환/반품 제한사항
	- 고객의 사용, 시간경과, 제품 소비에 의해 제품의 가치가 현저히 감소한 경우
	- 구성품의 분실, 누락, 파손 혹은 포장이 훼손되어 제품의 가치가 현저히 감소한 경우`;

	const { isLoading, isError, data, error } = useQuery('item', () =>
		axios.get('http://localhost:3001/item'),
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<DetailContainer>
			{data.data.map((item) => (
				<>
					<Contents key={item.itemId}>
						<Image
							src={item.thumbnail}
							alt="상품 대표사진"
							className="thumbnail"
						/>
						<Image src={item.descriptionImage} alt="상품 상세사진" />
						<InfoContainer>
							<InfoTitle>배송정보</InfoTitle>
							<InfoContent>{deliveryInfo}</InfoContent>
						</InfoContainer>
						<InfoContainer>
							<InfoTitle>교환 및 반품정보</InfoTitle>
							<InfoContent>{returnInfo}</InfoContent>
						</InfoContainer>
						<NoteContainer>
							<InfoTitle>Review</InfoTitle>
							<ListsContainer>
								<DetailReviewList />
								<DetailReviewList />
								<DetailReviewList />
							</ListsContainer>
						</NoteContainer>
						<NoteContainer>
							<InfoTitle>Talk</InfoTitle>
							<ListsContainer>
								<TalkForm />
								<DetailReviewList />
								<DetailReviewList />
								<DetailReviewList />
							</ListsContainer>
						</NoteContainer>
					</Contents>
					<SummaryContainer>
						<Summary
							name={item.title}
							brand={item.brand}
							categories={item.categories.map((el) => el.categoryName)}
							content={item.content}
							nowPrice={item.discountPrice}
							discountRate={item.discountRate}
							beforePrice={item.price}
						/>
					</SummaryContainer>
				</>
			))}
		</DetailContainer>
	);
}

const DetailContainer = styled.div`
	display: flex;
	justify-content: space-between;
	/* flex-direction: column; */
	/* align-items: center; */
	width: 100%;
	/* height: 2000px; */
	position: relative;
`;

const SummaryContainer = styled.div`
	width: 40%;
	display: flex;
	justify-content: center;
	position: relative;
`;

const Image = styled.img`
	width: 100%;
	/* width: 572px; */
	/* width: 50%px;
	height: 510px; */
	&.thumbnail {
		width: 570px;
		margin-bottom: 120px;
	}
`;

const Contents = styled.div`
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 50px;
	/* justify-content: center; */
`;
// const SummaryContainer = styled.div`
// 	position: relative;
// `;

// const ItemContainer = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	border-top: 1px solid #f1f1f1;
// 	padding: 50px 0;
// 	width: 100%;
// `;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	/* border-top: 1px solid #f1f1f1; */
	/* padding-top: 100px; */
	width: 100%;
	margin-top: 150px;
`;

const InfoTitle = styled.h2`
	display: flex;
	font-size: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid #f1f1f1;
	/* color: var(--purple-300); */
`;

const InfoContent = styled.pre`
	/* display: flex; */
	/* width: 100%; */
	white-space: pre-line;
	font-size: 15px;
	line-height: 1.5;
	color: var(--gray-400);
`;

const NoteContainer = styled.div`
	display: flex;
	flex-direction: column;
	/* border-top: 1px solid #f1f1f1; */
	padding-top: 70px;
	width: 100%;
	margin-top: 100px;
`;

const ListsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default Detail;
