/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import Price from '../Etc/Price';
import { ShortTextStar } from '../Stars/TextStar';
/* Default List는 item(배열)을 props를 받는 컴포넌트 입니다.
[{
	"thumbnail": "/",
	"descriptionImage": "/",
	"title":"비타민B",
	"content": "비타민B에 대한 설명!!!",
	"expiration": "2023-12-31",
	"brand": "BRAND2",
	"sales": 0,
	"price": 12000,
	"capacity": 60,
	"servingSize": 3,
	"discountRate": 20,
	"discountPrice": 9600,
	"categories": [
		{
			"categoryName": "눈_건강"
		}
	]]
배열의 구성은 이러하며, 실제 api에 어떻게 오느냐에 따라 내용물을 변경하셔도 됩니다. */
function MainListCard({ item }) {
	return (
		<EntireContainer>
			<DefaultContainer>
				<ContentBox>
					<ContentContainer />
					<ContentContainer middle>
						<ItemImg src={item.thumbnail} alt="상품 이미지" />
					</ContentContainer>
					<ContentContainer bottom>
						<div className="title brandName">{item.brand}</div>
						<div className="title itemName">{item.title}</div>
						<Price
							nowPrice={item.price}
							beforePrice={item.discountPrice}
							discountRate={item.discountRate}
							fontSize="16px"
						/>
					</ContentContainer>
				</ContentBox>
			</DefaultContainer>
			<DefaultContainer className="hover" hover>
				<ContentBox>
					<ContentContainer star>
						<ShortTextStar
							starAvg={item.starAvg}
							reviewCount={item.reviewSize}
						/>
					</ContentContainer>
					<ContentContainer middle>
						<ItemDescription>{item.content}</ItemDescription>
					</ContentContainer>
				</ContentBox>
			</DefaultContainer>
		</EntireContainer>
	);
}

const EntireContainer = styled.div`
	cursor: pointer;
	display: inline-flex;
	position: relative;
	&:hover {
		.hover {
			opacity: 1;
		}
		.title {
			color: white;
		}
		.brandName {
			color: var(--gray-200);
		}
		.beforeDiscounted {
			color: var(--gray-200);
		}
		.white {
			color: white;
			> path {
				color: var(--gray-200);
			}
		}
	}
`;

const DefaultContainer = styled.div`
	width: 297px;
	height: 469px;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.07);
	transition: 0.25s;
	${(props) =>
		props.hover // hover라는 프롭스가 들어간 디폴트 컨테이너
			? css`
					position: absolute;
					top: 0px;
					background-color: rgba(0, 0, 0, 0.4);
					backdrop-filter: blur(2px);
					opacity: 0;
					&:hover {
						opacity: 1;
					}
			  `
			: null}
`;
const ContentBox = styled.div`
	display: flex;
	flex-direction: column;
	padding: 24px 24px 33px 24px;
`;
const ContentContainer = styled.div`
	display: flex;
	flex-direction: row-reverse;
	margin-top: 10px;
	${(props) =>
		props.middle
			? css`
					padding-top: 58px;
					justify-content: center;
					padding-bottom: 82px;
			  `
			: props.bottom
			? css`
					z-index: 1;
					flex-direction: column;
					justify-content: none;
			  `
			: props.star
			? css`
					flex-direction: row;
					margin-top: 5px;
			  `
			: null}

	.brandName {
		color: var(--gray-400);
		padding-bottom: 10.5px;
	}
	.itemName {
		font-weight: var(--extraBold);
		font-size: 20px;
		padding-bottom: 27.5px;
	}
	.itemPrice {
		font-size: 20px;
		font-weight: var(--regular);
	}
`;

const ItemImg = styled.img`
	width: 132px;
	height: 153px;
`;

const ItemDescription = styled.p`
	color: white;
	font-size: 20px;
	line-height: 25px;
	letter-spacing: -0.04em;
`;
export default MainListCard;
