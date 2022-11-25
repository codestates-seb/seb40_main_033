import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToggleTab } from '../../components/Tabs/TabButtons';
import OrderList from '../../components/Lists/MyPageLists/OrderList';
import Pagination from '../../components/Etc/Pagination';

// 주문내역
function SubscriptionOrder() {
	const [lists, setLists] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3001/subOrders')
			.then((res) => {
				setLists(res.data);
			})
			.catch((err) => {
				throw new Error(err);
			});
	}, []);

	return (
		<>
			<ToggleTab />
			<ListContainer>
				{lists &&
					lists.map((list) => (
						<OrderList key={list.orderId} list={list} totalPrice />
					))}
			</ListContainer>
			<Pagination total="10" limit="8" />
		</>
	);
}

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4px;
	margin: 50px 0 75px 0;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);

	& > {
		:last-child {
			border: none;
		}
	}
`;

export default React.memo(SubscriptionOrder);
