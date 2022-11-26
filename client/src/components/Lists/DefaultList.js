/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import WishlistBtn from '../Buttons/WishlistButton';
import { ShortTextStar } from '../Stars/TextStar';
// 세연님이 별점 만들면 가져다가 쓰자.
function DefaultList({ item }) {
	return (
		<EntireContainer>
			<DefaultContainer>
				<ContentBox>
					<ContentContainer />
					<ContentContainer middle>
						<ItemImg
							src="https://cdn.pillyze.io/products/v1/12k/9445bfe9-12669/500"
							alt="상품 이미지"
						/>
					</ContentContainer>
					<ContentContainer bottom>
						<div className="title brandName">{/* {item.brand} */} 뭐든</div>
						<div className="title itemName">{/* {item.title} */} 나오시고</div>
						<div className="title itemPrice">
							{/* {item.price.toLocaleString('ko-KR')}  */} 16,000 원
						</div>
					</ContentContainer>
				</ContentBox>
			</DefaultContainer>
			<DefaultContainer className="hover" hover>
				<ContentBox>
					<ContentContainer star>
						<ShortTextStar />
					</ContentContainer>
					<ContentContainer middle>
						<ItemDescription>
							{/* {item.content} */}
							상품설명이 들어갈 자리입니다. 아껴주세요.
						</ItemDescription>
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
	}
`;

const DefaultContainer = styled.div`
	width: 297px;
	height: 469px;
	border-radius: 10px;
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
	${(props) =>
		props.middle
			? css`
					padding-top: 58px;
					justify-content: center;
					padding-bottom: 93px;
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
export default DefaultList;
