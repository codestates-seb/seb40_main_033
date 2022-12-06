import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderList from '../../components/Lists/MyPageLists/OrderList';
import Pagination from '../../components/Etc/Pagination';
import { useGet } from '../../hooks/useFetch';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';

function NormalOrder() {
	const { pathname } = useLocation();

	const { isLoading, isError, data, error } = useGet(
		'/orders?subscription=false',
		pathname,
	);

	if (isLoading) {
		return (
			<ListContainer>
				<LoadingSpinner />
			</ListContainer>
		);
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const lists = !isLoading && data.data.data;

	return (
		<>
			<ListContainer>
				{data && lists.length === 0 ? (
					<Nolists>주문 내역이 없습니다.</Nolists>
				) : (
					lists.map((list) => <OrderList key={list.orderId} list={list} />)
				)}
			</ListContainer>
			{/* <Pagination total="10" limit="8" /> */}
		</>
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

export default React.memo(NormalOrder);
