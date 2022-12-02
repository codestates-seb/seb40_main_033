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

	const lists = !isLoading && data.data.data;

	return (
		<Box>
			<LeftContainer>
				<DestinationInfo />
				<span />
				<PaymentInfo options />
			</LeftContainer>
			<RightContainer>
				<Title>주문 상세 내역</Title>
				{data &&
					lists.map((list) => (
						<OrderDetailList
							key={list.orderId}
							orderId={list.orderId}
							brand={list.brand}
							thumbnail={list.thumbnail}
							title={list.title}
							price={list.price}
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
`;

const Title = styled.h1`
	font-size: 20px;
	font-weight: var(--bold);
	margin-bottom: 35px;
	align-self: flex-start;
	/* text-align: left; */
`;

export default React.memo(OrderDetail);
