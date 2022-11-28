import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CartList from '../../components/Lists/MyPageLists/CartList';
import {
	PurpleButton,
	LightPurpleButton,
} from '../../components/Buttons/PurpleButton';

// 일반 장바구니
function NormalCart() {
	const [cartItem, setCartItem] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3001/cartProducts')
			.then((response) => {
				setCartItem(response.data);
			})
			.catch((err) => {
				throw new Error(err);
			});
	}, []);

	return (
		<Box>
			<List>
				{cartItem.map((item) => (
					<CartList key={item.cartId} item={item} />
				))}
			</List>
			<Bottom>
				<Display>
					<Text>합계</Text>
					<Number>totalPrice</Number>
					<Text>할인 금액</Text>
					<Number>totalDiscountPrice</Number>
					<Text>결제 예정 금액</Text>
					<TotalNumber>totalPrice - totalDiscountPrice</TotalNumber>
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
