import styled from 'styled-components';
import { MdArrowForwardIos } from 'react-icons/md';
import { LetterButtonColor } from '../../Buttons/LetterButton';

function OrderDetailList() {
	const price = 7000;
	const quantity = 5;
	const PillsNum = 60;

	return (
		<Box>
			<Image> img </Image>
			<Wrap>
				<InformationForm>
					<Brand>California Gold Nutrition</Brand>
					<Prod>
						<Name>오메가3 프리미엄 피쉬 오일</Name>
						<Pill>, {PillsNum}정</Pill>
					</Prod>
					<Price>{price} 원</Price>
				</InformationForm>
				<QuantityForm>
					<Bottom>
						<Quantity> {quantity}개/</Quantity>
						<PriceBold> {price * quantity} 원</PriceBold>
					</Bottom>
					<WrapReview>
						<LetterButtonColor color="gray" colorcode="500" fontSize="13px">
							리뷰 쓰기
						</LetterButtonColor>
						<MdArrowForwardIos />
					</WrapReview>
				</QuantityForm>
			</Wrap>
		</Box>
	);
}

const Box = styled.div`
	background-color: white;
	width: 420px;
	height: 179px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrap = styled.div`
	margin-top: 30px;
	width: 260px;
	height: 90px;
	display: flex;
	flex-direction: column;
	font-size: 13px;
`;

const Image = styled.div`
	border: 1px solid green;
	width: 121px;
	height: 118px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InformationForm = styled.div`
	width: 187px;
	height: 65px;
	margin-left: 20px;
	position: relative;
	bottom: 12px;
`;

const Brand = styled.div`
	border: 1px solid green;
	color: var(--green-200);
	font-weight: var(--bold);
`;

const Prod = styled.div`
	display: flex;
	width: 210px;
`;

const Name = styled.div`
	border: 1px solid purple;
	color: var(--gray-600);
	font-weight: var(--bold);
	display: flex;
	margin-bottom: 14px;
`;

const Pill = styled.div`
	border: 1px solid orange;
	height: 15px;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const Price = styled.div`
	color: var(--gray-600);
	font-weight: var(--regular);
`;

const QuantityForm = styled.div`
	width: 230px;
	margin-left: 22px;
	display: flex;
	justify-content: space-between;
`;

const Bottom = styled.div`
	display: flex;
	font-size: 16px;
	font-weight: var(--extrabold);
`;

const Quantity = styled.div`
	color: var(--gray-500);
`;

const PriceBold = styled.div`
	color: var(--gray-600);
`;

const WrapReview = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

export default OrderDetailList;
