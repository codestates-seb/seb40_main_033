import styled from 'styled-components';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OrderDetailList from '../../components/Lists/MyPageLists/OrderDetailList';
import { PaymentInfo, DestinationInfo } from '../../components/Etc/PayInfo';
import { useGet } from '../../hooks/useFetch';

// 주문내역 상세조회
function OrderDetail() {
	const { pathname } = useLocation();
	const { id } = useParams();

	const { isLoading, isError, data, error } = useGet(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/orders/${id}`,
		pathname,
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}
	console.log('data', data.data.data); // 여기서 배송지정보, 결제정보
	console.log('list?', data.data.data.itemOrders.data); // 여기서 배송지정보, 결제정보

	const lists = !isLoading && data.data.data.itemOrders.data;
	const info = !isLoading && data.data.data;
	console.log('info', info);

	const payData = {
		totalPrice: info.totalPrice,
		totalDiscountPrice: info.totalDiscountPrice,
		expectPrice: info.expectPrice,
	};

	// console.log(info.name);
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
				<Title>주문 상세 내역</Title>
				{data &&
					lists.map((list) => (
						<OrderDetailList
							key={list.itemOrderId}
							orderId={list.itemOrderId} // 이게 맞나 나중에 확인
							itemId={list.item.itemId}
							brand={list.item.brand}
							thumbnail={list.item.thumbnail}
							title={list.item.title}
							// price={list.item.discountPrice || list.item.price}
							quantity={list.quantity}
							nowPrice={list.item.disCountPrice || list.item.price}
							discountRate={
								list.item.discountRate === 0 ? '' : list.item.discountRate
							}
							beforePrice={list.item.disCountPrice ? list.item.price : null}
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
	padding: 60px 50px;
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
`;

const Title = styled.h1`
	font-size: 20px;
	font-weight: var(--bold);
	margin-bottom: 35px;
	align-self: flex-start;
	/* text-align: left; */
`;

export default React.memo(OrderDetail);
