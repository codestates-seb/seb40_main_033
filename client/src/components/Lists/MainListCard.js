/* eslint-disable no-nested-ternary */
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Price from '../Etc/Price';
import { ShortTextStar } from '../Stars/TextStar';

function MainListCard({ item }) {
	const navigate = useNavigate();

	const handleItemClick = () => {
		navigate(`/detail/${item.itemId}`);
	};

	return (
		<EntireContainer>
			<DefaultContainer>
				<ContentBox>
					<ContentContainer middle>
						<ItemImg src={item.thumbnail} alt="상품 이미지" />
					</ContentContainer>
					<ContentContainer bottom onClick={handleItemClick}>
						<div className="title brandName">{item.brand}</div>
						<NamePriceBox>
							<div className="title itemName">{item.title}</div>
							<Price
								nowPrice={item.discountPrice}
								beforePrice={item.price}
								discountRate={item.discountRate}
								fontSize="16px"
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
							main="main"
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
	padding: 25px 25px 33px 25px;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: row-reverse;
	${(props) =>
		props.middle
			? css`
					justify-content: center;
					padding-bottom: 46px;
			  `
			: props.bottom
			? css`
					z-index: 1;
					flex-direction: column;
					justify-content: none;
			  `
			: props.star
			? css`
					flex-direction: column;
					margin-top: 5px;
			  `
			: null}

	.brandName {
		color: var(--gray-400);
		font-size: 15px;
		padding-bottom: 10.5px;
	}
	.itemName {
		font-weight: var(--extraBold);
		font-size: 20px;
		line-height: 1.1;
		word-break: keep-all;
	}
`;

const NamePriceBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 85px;
`;

const ItemImg = styled.img`
	width: 100%;
	height: 100%;
`;

const ItemDescription = styled.p`
	color: white;
	font-size: 18px;
	line-height: 1.4;
	letter-spacing: -0.04em;
	word-break: keep-all;
	margin-top: 65px;
	text-align: left;
	width: 100%;
`;

const Ingredient = styled.p`
	display: flex;
	color: var(--gray-200);
	margin-top: 12px;
	font-size: 14px;
	line-height: 1.3;
	word-break: keep-all;
`;

export default MainListCard;
