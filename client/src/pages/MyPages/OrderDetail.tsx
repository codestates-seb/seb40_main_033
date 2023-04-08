/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OrderDetailList from '../../components/Lists/MyPageLists/OrderDetailList';
import CustomerInformation from '../../components/Etc/CustomerInformation';
import PaymentSummary from '../../components/Etc/PaymentSummary';
import { useGet } from '../../hooks/useFetch';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';
import { ERROR_INFORMATION } from '../../components/Etc/Constants';
import { OrderDetailData } from '../../types/order.type';

// 주문내역 상세조회
function OrderDetail() {
	const { pathname } = useLocation();
	const { id } = useParams();

	const { isLoading, isError, data, error } = useGet<OrderDetailData>(
		`/orders/${id}`,
		pathname,
	);

	const lists = !isLoading && data?.data?.data.itemOrders.data;
	const info = !isLoading && data?.data?.data;

	if (isLoading || !lists || !info) {
		return <LoadingSpinner />;
	}

	if (isError && error instanceof Error) {
		return <div>{ERROR_INFORMATION}</div>;
	}

	return (
		<Box>
			<LeftContainer>
				<CustomerInformation payData={info} />
				<span />
				<PaymentSummary payData={info} />
			</LeftContainer>
			<RightContainer>
				<Title className="order">주문 상세 내역</Title>
				<ListContainer>
					{data &&
						lists.map((list) => (
							<OrderDetailList
								key={list.itemOrderId}
								itemOrderId={list.itemOrderId} // 개별주문아이디!
								itemId={list.item.itemId}
								brand={list.item.brand}
								thumbnail={list.item.thumbnail}
								title={list.item.title}
								quantity={list.quantity}
								nowPrice={list.item.discountPrice || list.item.price}
								discountRate={list.item.discountRate}
								beforePrice={list.item.discountPrice && list.item.price}
								period={list.period}
								subscription={list.subscription}
								capacity={list.item.capacity}
								orderStatus={info.orderStatus}
							/>
						))}
				</ListContainer>
			</RightContainer>
		</Box>
	);
}

const Box = styled.div`
	display: flex;
	justify-content: space-between;
	width: 1038px;
`;

const LeftContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: 1px solid #f1f1f1;
	background-color: white;
	width: 510px;
	height: 710px;
	padding: 70px 50px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	border-radius: 10px;

	span {
		height: 1px;
		background-color: #f1f1f1;
	}
`;

const RightContainer = styled(LeftContainer)`
	padding: 0px 0px 40px 0px;
`;

const ListContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	position: relative;
	padding: 0px;
	overflow-x: visible;
	padding-bottom: 30px;
	overflow-y: auto;
	scroll-behavior: smooth;

	::-webkit-scrollbar {
		width: 11px;
	}

	::-webkit-scrollbar-thumb {
		background-color: rgb(235, 235, 235);
		border-radius: 10px;
		background-clip: padding-box;
		border: 2px solid transparent;
	}
`;

const Title = styled.h1`
	font-size: 20px;
	font-weight: var(--bold);
	border-radius: 10px;
	width: 100%;
	padding: 70px 0 16px 0;
	background-color: white;
	padding-left: 50px;
`;

export default React.memo(OrderDetail);
