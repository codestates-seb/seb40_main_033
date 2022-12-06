import styled from 'styled-components';
import React from 'react';
import { useLocation } from 'react-router-dom';
import OrderList from '../../components/Lists/MyPageLists/OrderList';
import { useGet } from '../../hooks/useFetch';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';

// 주문내역
function SubscriptionOrder() {
	const { pathname } = useLocation();

	const { isLoading, isError, data, error } = useGet(
		'/orders?subscription=true&page=1&size=70',
		pathname,
	);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}
	const lists = !isLoading && data.data.data;

	return (
		<ListContainer>
			{data && lists.length === 0 ? (
				<Nolists>주문 내역이 없습니다.</Nolists>
			) : (
				lists.map((list) => (
					<OrderList key={list.orderId} list={list} totalPrice />
				))
			)}
		</ListContainer>
	);
}

const ListContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4px;
	margin: 25px 0 75px 0;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	width: 864px;
	min-height: 200px;
	position: relative;

	& > {
		:last-child {
			border: none;
		}
	}
`;

const Nolists = styled.div`
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
`;

export default React.memo(SubscriptionOrder);
