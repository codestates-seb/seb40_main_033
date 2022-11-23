import styled from 'styled-components';
import { ToggleTab } from '../components/Tabs/TabButtons';
import CartList from '../components/Lists/MyPageLists/CartList';
import {
	PurpleButton,
	LightPurpleButton,
} from '../components/Buttons/PurpleButton';

// 일반 장바구니
function NormalCart() {
	const price = 20000;
	const discount = 2000;

	return (
		<Box>
			<Top>
				<Title>장바구니</Title>
				<TabButton>
					<ToggleTab />
				</TabButton>
			</Top>
			<List>
				<CartList />
			</List>
			<Bottom>
				<Display>
					<Text>합계</Text>
					<Number>{price}</Number>
					<Text>할인 금액</Text>
					<Number>{discount}</Number>
					<Text>결제 예정 금액</Text>
					<TotalNumber>{price - discount}</TotalNumber>
				</Display>
				<Button>
					<LightPurpleButton width="143px" height="50px">
						계속 쇼핑하기
					</LightPurpleButton>
					<PurpleButton width="143px" height="50px">
						구매하기
					</PurpleButton>
				</Button>
			</Bottom>
		</Box>
	);
}

const Box = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Top = styled.div`
	border-bottom: 1px solid var(--gray-200);
	width: 1115px;
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.div`
	font-weight: var(--extraBold);
	font-size: 36px;
`;

const TabButton = styled.div`
	width: 196px;
	height: 54px;
`;

const List = styled.div`
	padding-top: 44px;
	background-color: white;
	border-radius: 10;
	border: 1px solid #f1f1f1;
	margin-top: 30px;
	width: 983px;
	height: 1094px;
	flex-direction: column;
	display: flex;
	align-items: center;
`;

const Bottom = styled.div`
	margin-top: 74px;
	width: 864px;
	height: 126px;
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Display = styled.div`
	border-bottom: 1px solid var(--gray-200);
	width: 670px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Text = styled.div`
	font-size: 16px;
	font-weight: var(--regular);
	color: var(--gray-400);
`;

const Number = styled.div`
	font-size: 24px;
	font-weight: var(--bold);
`;

const TotalNumber = styled.div`
	font-size: 24px;
	font-weight: var(--bold);
	color: var(--purple-200);
`;
const Button = styled.div`
	margin-top: 36px;
	width: 296px;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default NormalCart;
