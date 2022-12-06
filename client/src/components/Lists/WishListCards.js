/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Price from '../Etc/Price';
import { ShortTextStar } from '../Stars/TextStar';
import WishlistButton from '../Buttons/WishlistButton';

function WishListCards({ item }) {
	const navigate = useNavigate();
	const handleItemClick = () => {
		navigate(`/detail/${item.itemId}`);
	};
	return (
		<EntireContainer>
			<DefaultContainer>
				<ContentBox>
					<ContentContainer wishBtn>
						<WishlistButton isChecked itemId={item.itemId} />
					</ContentContainer>
					<ContentContainer middle>
						<ItemImg src={item.thumbnail} alt="상품 이미지" />
					</ContentContainer>
					<ContentContainer bottom onClick={handleItemClick}>
						<div className="title brandName">{item.brand}</div>
						<NamePriceBox>
							<div className="title itemName">{item.title}</div>
							<Price
								nowPrice={item.discountPrice || item.price}
								beforePrice={item.price}
								discountRate={item.discountRate}
								fontSize="13px"
								font-weight="var(--regular)"
							/>
						</NamePriceBox>
					</ContentContainer>
				</ContentBox>
			</DefaultContainer>
			<DefaultContainer onClick={handleItemClick} className="hover" hover>
				<ContentBox>
					<ContentContainer star>
						<ShortTextStar
							starAvg={item.starAvg}
							reviewCount={item.reviewSize}
						/>
						<Ingredient>
							{String(
								`${item.nutritionFacts.map((fact) => ` ${fact.ingredient}`)}`,
							)}
						</Ingredient>
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
	margin-right: 20px;
	margin-bottom: 30px;
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
	width: 245px;
	height: 387px;
	border-radius: 10px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	background-color: white;
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
	width: 245px;
	height: 387px;
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
					justify-content: center;
					padding-bottom: 26px;
			  `
			: props.bottom
			? css`
					margin-top: 12px;
					z-index: 1;
					flex-direction: column;
					justify-content: none;
			  `
			: props.star
			? css`
					flex-direction: column;
					margin-top: 6.5px;
			  `
			: props.wishBtn
			? css`
					position: absolute;
					left: 196px;
					top: 29px;
			  `
			: null}

	.brandName {
		font-size: 13px;
		color: var(--gray-400);
		padding-bottom: 10.5px;
	}
	.itemName {
		font-weight: var(--extraBold);
		font-size: 16px;
		word-break: keep-all;
		line-height: 1.1;
	}
	.itemPrice {
		font-size: 16px;
		font-weight: var(--regular);
	}
`;

const ItemImg = styled.img`
	width: 100%;
	height: 100%;
`;

const NamePriceBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 66px;
`;

const ItemDescription = styled.p`
	width: 100%;
	color: white;
	font-size: 15px;
	line-height: 1.4;
	letter-spacing: -0.04em;
	margin-top: 50px;
	word-break: keep-all;
`;

const Ingredient = styled.p`
	display: flex;
	color: var(--gray-200);
	margin-top: 12px;
	line-height: 1.3;
	word-break: keep-all;
	font-size: 12px;
`;

export default WishListCards;
