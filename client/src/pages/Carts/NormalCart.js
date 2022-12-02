import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';
import CartList from '../../components/Lists/MyPageLists/CartList';
import { PurpleButton } from '../../components/Buttons/PurpleButton';
import Price from '../../components/Etc/Price';
import { useGet } from '../../hooks/useFetch';

// 일반 장바구니
function NormalCart() {
	const { pathname } = useLocation();

	const {
		isLoading,
		isError,
		data: items,
		error,
	} = useGet(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/carts?subscription=false',
		pathname,
	);

	console.log(items);

	if (isLoading) {
		return <List> 대기중 ..</List>;
	}
	if (isError) {
		return <List> {error.message} </List>;
	}

	return (
		<Box>
			<List>
				{items.data.data.map((item) => (
					<CartList key={item.cartId} item={item} />
				))}
			</List>
			<Bottom>
				<Display>
					<Text>합계</Text>
					<Price nowPrice="10000" fontSize="24px" fontWeight="bold" />
					<Text>할인 금액</Text>
					<Price nowPrice="10000" fontSize="24px" fontWeight="bold" />
					<Text>결제 예정 금액</Text>
					<Price nowPrice="10000" fontSize="24px" fontWeight="bold" purple />
				</Display>
				<Button>
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
	border-radius: 10px;
	/* border: 1px solid #f1f1f1; */
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
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

const Button = styled.div`
	margin-top: 36px;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export default NormalCart;
