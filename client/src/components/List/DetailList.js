import styled from 'styled-components';
import { LetterButtonColor } from '../Buttons/LetterButton';

function DetailList() {
	return (
		<Box>
			<Image> img </Image>
			<Wrap>
				<InformationForm>
					<Brand>California Gold Nutrition</Brand>
					<Prod>
						<Name>오메가3 프리미엄 피쉬 오일</Name>
						<Pill>, 60정</Pill>
					</Prod>
					<Price>6000원</Price>
				</InformationForm>
				<QuantityForm>
					<Bottom>
						<Quantity> 총갯수 </Quantity>
						<PriceBold> /총액 </PriceBold>
					</Bottom>
					<LetterButtonColor color="gray" colorcode="500">
						리뷰 쓰기
					</LetterButtonColor>
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
	margin-top: 40px;
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
	margin-left: 24px;
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
`;

const Name = styled.div`
	border: 1px solid purple;
	color: var(--gray-600);
	font-weight: var(--bold);
	display: flex;
	margin-bottom: 15px;
`;

const Pill = styled.div`
	border: 1px solid orange;
	height: 15px;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const Price = styled.div`
	border: 1px solid red;
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
`;

const Quantity = styled.div`
	border: 1px solid red;
	color: var(--gray-500);
	font-weight: var(--regular);
`;

const PriceBold = styled.div`
	border: 1px solid red;
	color: var(--gray-600);
	font-weight: var(--extrabold);
`;

export default DetailList;