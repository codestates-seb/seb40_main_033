/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OrderDetailList from '../../components/Lists/MyPageLists/OrderDetailList';
import { PaymentInfo, DestinationInfo } from '../../components/Etc/PayInfo';
import { useGet } from '../../hooks/useFetch';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';

// 주문내역 상세조회
function OrderDetail() {
	const { pathname } = useLocation();
	const { id } = useParams();

	const { isLoading, isError, data, error } = useGet(`/orders/${id}`, pathname);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const lists = !isLoading && data.data.data.itemOrders.data;
	const info = !isLoading && data.data.data;

	const payData = {
		totalPrice: info.totalPrice,
		totalDiscountPrice: info.totalDiscountPrice,
		expectPrice: info.expectPrice,
	};

	return (
		<Box>
			<LeftContainer>
				<DestinationInfo
					name={info.name}
					phone={info.phone}
					address={info.address}
					detailAddress={info.detailAddress}
				/>
				<span />
				<PaymentInfo options payData={payData} />
			</LeftContainer>
			<RightContainer>
				<Title className="order">주문 상세 내역</Title>
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
							nowPrice={list.item.disCountPrice || list.item.price}
							discountRate={
								list.item.discountRate === 0 ? '' : list.item.discountRate
							}
							beforePrice={list.item.disCountPrice ? list.item.price : null}
							period={list.period}
							subscription={list.subscription}
							capacity={list.item.capacity}
							orderStatus={info.orderStatus}
						/>
					))}
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
	align-items: center;
	display: flex;
	justify-content: flex-start;
	position: relative;
	padding: 0px;
	overflow-x: visible;
	width: 510px;
	padding-bottom: 30px;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;

const Title = styled.h1`
	font-size: 20px;
	font-weight: var(--bold);
	align-self: flex-start;
	position: sticky;
	width: 100%;
	top: 0px;
	padding: 70px 0 20px 0;
	background-color: white;
	&.order {
		padding-left: 50px;
	}
`;

export default React.memo(OrderDetail);
