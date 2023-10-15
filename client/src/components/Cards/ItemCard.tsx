/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Price from '../Etc/Price';
import { ShortTextStar } from '../Stars/TextStar';
import WishlistButton from '../Buttons/WishlistButton';
import { CardItem } from '../../types/main.type';

interface CardItemProps {
	item: CardItem;
	wishBtn?: boolean;
	main?: boolean;
	fontSize: string;
}

function ItemCard({ item, wishBtn, main, fontSize }: CardItemProps) {
	const navigate = useNavigate();

	const handleItemClick = () => {
		navigate(`/detail/${item.itemId}`);
	};

	return (
		<EntireContainer main={main}>
			<DefaultContainer main={main}>
				<ContentBox>
					{wishBtn && (
						<ContentContainer kind="wishBtn" main={main}>
							<WishlistButton isChecked itemId={item.itemId} />
						</ContentContainer>
					)}
					<ContentContainer kind="middle" main={main}>
						<ItemImg src={item.thumbnail} alt="상품 이미지" />
					</ContentContainer>
					<ContentContainer kind="bottom" main={main} onClick={handleItemClick}>
						<div className="title brandName">{item.brand}</div>
						<NamePriceBox main={main}>
							<div className="title itemName">{item.title}</div>
							<Price
								nowPrice={item.discountPrice}
								beforePrice={item.price}
								discountRate={item.discountRate}
								fontSize={fontSize}
							/>
						</NamePriceBox>
					</ContentContainer>
				</ContentBox>
			</DefaultContainer>
			<DefaultContainer
				onClick={handleItemClick}
				className="hover"
				main={main}
				hover
			>
				<ContentBox>
					<ContentContainer main={main} kind="star">
						<ShortTextStar
							starAvg={item.starAvg}
							reviewCount={item.reviewSize}
							{...(main ? { main: 'main' } : {})}
						/>
						<Ingredient main={main}>
							{String(
								`${item.nutritionFacts.map((fact) => ` ${fact.ingredient}`)}`,
							)}
						</Ingredient>
					</ContentContainer>
					<ContentContainer main={main} kind="middle">
						<ItemDescription main={main}>{item.content}</ItemDescription>
					</ContentContainer>
				</ContentBox>
			</DefaultContainer>
		</EntireContainer>
	);
}

const EntireContainer = styled.div<{ main?: boolean }>`
	cursor: pointer;
	display: inline-flex;
	position: relative;
	margin-right: ${(props) =>
		props.main ? '0' : '20px'}; // 밑에 둘은 wishList 에서 카드간 간격
	margin-bottom: ${(props) =>
		props.main ? '0' : '30px'}; // wishList 에서 카드간 간격
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

const DefaultContainer = styled.div<{ hover?: boolean; main?: boolean }>`
	${(props) =>
		props.main
			? css`
					width: 297px;
					height: 469px;
					box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.07);
			  `
			: css`
					width: 245px;
					height: 387px;
					box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
			  `}
	border-radius: 10px;
	background-color: white;
	transition: 300ms;
	${(props) =>
		props.hover && // hover라는 프롭스가 들어간 디폴트 컨테이너
		css`
			position: absolute;
			top: 0px;
			background-color: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(2px);
			opacity: 0;
			&:hover {
				opacity: 1;
			}
		`}
`;
const ContentBox = styled.div`
	display: flex;
	flex-direction: column;
	padding: 24px 24px 33px 24px;
`;

const ContentContainer = styled.div<{
	kind?: string;
	main?: boolean;
}>`
	display: flex;
	flex-direction: row-reverse;
	${(props) => {
		switch (props.kind) {
			case 'middle':
				return css`
					padding-bottom: ${props.main ? '46px' : '26px'};
				`;
			case 'bottom':
				return css`
					margin-top: :${props.main ? '0' : '12px'};
					z-index: 1;
					flex-direction: column;
					justify-content: none;
				`;
			case 'star':
				return css`
					flex-direction: column;
					margin-top: ${props.main ? '5px' : '6.5px'};
				`;
			case 'wishBtn':
				return css`
					position: absolute;
					left: 196px;
					top: 29px;
				`;
		}
	}}

	.brandName {
		font-size: ${(props) => (props.main ? '15px' : '13px')};
		color: var(--gray-400);
		padding-bottom: 10.5px;
	}
	.itemName {
		font-weight: var(--extraBold);
		font-size: ${(props) => (props.main ? '20px' : '16px')};
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

const NamePriceBox = styled.div<{ main?: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: ${(props) => (props.main ? '85px' : '66px')};
`;

const ItemDescription = styled.p<{ main?: boolean }>`
	width: 100%;
	color: white;
	line-height: 1.4;
	letter-spacing: -0.04em;
	word-break: keep-all;
	${(props) =>
		props.main
			? css`
					font-size: 18px;
					margin-top: 65px;
			  `
			: css`
					font-size: 15px;
					margin-top: 50px;
			  `}
`;

const Ingredient = styled.p<{ main?: boolean }>`
	display: flex;
	color: var(--gray-200);
	margin-top: 12px;
	line-height: 1.3;
	word-break: keep-all;
	font-size: ${(props) => (props.main ? '14px' : '12px')};
`;

export default ItemCard;
