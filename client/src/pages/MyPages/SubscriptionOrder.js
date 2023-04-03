import styled from 'styled-components';
import React, { useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import OrderList from '../../components/Lists/MyPageLists/OrderList';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';
import { useGetOrderList } from '../../hooks/useGetList';
import {
	ERROR_INFORMATION,
	NO_ORDER_HISTORY,
} from '../../components/Etc/Constants';

// 주문내역
function SubscriptionOrder() {
	const { pathname } = useLocation();
	const { ref, inView } = useInView();
	const { data, status, fetchNextPage, isFetchingNextPage } = useGetOrderList({
		pathname,
		isSub: true,
	});

	// 최하단 div가 보이면 다음 페이지를 불러옴
	useEffect(() => {
		if (inView) fetchNextPage();
	}, [inView]);

	if (status === 'loading') {
		return (
			<ListContainer>
				<LoadingSpinner />
			</ListContainer>
		);
	}

	if (status === 'error') {
		return (
			<ListContainer>
				<Message>{ERROR_INFORMATION}</Message>
			</ListContainer>
		);
	}

	return (
		<>
			<ListContainer>
				{data.pages[0].data.length === 0 ? (
					<Message>{NO_ORDER_HISTORY}</Message>
				) : (
					data?.pages.map((page, i) => (
						<Fragment key={`page-${i.toString()}`}>
							{page.data.map((list) => (
								<OrderList key={list.orderId} list={list} totalPrice />
							))}
						</Fragment>
					))
				)}
			</ListContainer>
			{isFetchingNextPage ? (
				<LoadingSpinner />
			) : (
				<div className="lastDiv" ref={ref} />
			)}
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
	width: 872px;
	min-height: 200px;
	position: relative;

	& > {
		:last-child {
			border: none;
		}
	}
`;

const Message = styled.div`
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 16px;
`;

export default React.memo(SubscriptionOrder);
