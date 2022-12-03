import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderList from '../../components/Lists/MyPageLists/OrderList';
import Pagination from '../../components/Etc/Pagination';
import { useGet } from '../../hooks/useFetch';

function NormalOrder() {
	const { pathname } = useLocation();

	const { isLoading, isError, data, error } = useGet(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/orders?subscription=false',
		pathname,
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const lists = !isLoading && data.data.data;

	return (
		<>
			<ListContainer>
				{data &&
					lists.map((list) => <OrderList key={list.orderId} list={list} />)}
			</ListContainer>
			<Pagination total="10" limit="8" />
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

	& > {
		:last-child {
			border: none;
		}
	}
`;

export default React.memo(NormalOrder);
