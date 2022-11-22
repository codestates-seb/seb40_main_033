import styled from 'styled-components';
import { LetterButtonColor } from '../../Buttons/LetterButton';

function OrderList() {
	const price = 7000;

	return (
		<Box>
			<Wrap>
				<Image> img </Image>
				<MainBox>
					<InformationForm>
						<ShoppingInfo> 배송완료 | 날짜 </ShoppingInfo>
						<Inform>
							<Brand>California Gold Nutrition</Brand>
							<Name>, 오메가3 프리미엄 피쉬 오일</Name>
						</Inform>
						<Price>{price} 원</Price>
					</InformationForm>
					<BtnForm>
						<LetterButtonColor
							color="gray"
							colorCode="500"
							fontSize="16px"
							hoverColor="gray"
							hoverColorCode="500"
						>
							상세 보기
						</LetterButtonColor>
						<LetterButtonColor
							color="red"
							colorCode="100"
							fontSize="16px"
							hoverColor="red"
							hoverColorCode="100"
						>
							주문 취소
						</LetterButtonColor>
					</BtnForm>
				</MainBox>
			</Wrap>
		</Box>
	);
}

const Box = styled.div`
	background-color: white;
	width: 864px;
	height: 208px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Wrap = styled.div`
	width: 820px;
	height: 163px;
	display: flex;
	justify-content: 'center';
	align-items: center;
`;

const MainBox = styled.div`
	margin-left: 30px;
	width: 626px;
	height: 163px;
	display: flex;
	align-items: center;
	font-size: 16px;
`;

const Image = styled.div`
	border: 1px solid green;
	width: 163px;
	height: 163px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InformationForm = styled.div`
	width: 524px;
	height: 90px;
	flex-direction: column;
	display: flex;
	justify-content: space-between;
`;

const Inform = styled.div`
	margin-bottom: 25px;
	width: 400px;
	display: flex;
`;

const ShoppingInfo = styled.div`
	border: 1px solid black;
	width: 150px;
	height: 30px;
	display: flex;
	align-items: center;
	color: var(--gray-500);
	font-size: var(--regular);
	font-size: 13px;
`;

const Brand = styled.div`
	border: 1px solid green;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const Name = styled.div`
	border: 1px solid purple;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const Price = styled.div`
	color: var(--gray-600);
	font-weight: var(--regular);
	width: 100px;
`;

const BtnForm = styled.div`
	width: 100px;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	font-weight: var(--regular);
`;

export default OrderList;
