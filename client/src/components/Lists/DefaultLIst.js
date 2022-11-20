/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import WishlistBtn from '../Buttons/WishlistButton';
// 세연님이 별점 만들면 가져다가 쓰자.

function DefaultList() {
	return (
		<EntireContainer>
			<DefaultContainer>
				<ContentBox>
					<ContentContainer>
						<WishlistBtn />
					</ContentContainer>
					<ContentContainer middle>
						<ItemImg
							src="https://cdn.pillyze.io/products/v1/12k/9445bfe9-12669/500"
							alt="상품 이미지"
						/>
					</ContentContainer>
					<ContentContainer buttom>
						<div className="title brandName">네이처메이드</div>
						<div className="title itemName">멀티비타민 60정</div>
						<div className="title itemPrice">6,000원</div>
					</ContentContainer>
				</ContentBox>
			</DefaultContainer>
			<DefaultContainer className="hover" hover>
				<ContentBox>
					<ContentContainer middle>
						<ItemDescription>
							필수 영양소 멀티비타민&미네랄 20종. 활력충전을 위한 고함량 비타민
							B군
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
			: props.buttom
			? css`
					z-index: 1;
					flex-direction: column;
					justify-content: none;
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
