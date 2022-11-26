import styled from 'styled-components';
import OrderDetailList from '../../components/Lists/MyPageLists/OrderDetailList';
import { PaymentInfo, DestinationInfo } from '../../components/Etc/PayInfo';

// 주문내역 상세조회
function OrderDetail() {
	return (
		<Box>
			<LeftContainer>
				<DestinationInfo />
				<span />
				<PaymentInfo options />
			</LeftContainer>

			<RightContainer>
				<Title>주문 상세 내역</Title>
				<OrderDetailList />
				<OrderDetailList />
				<OrderDetailList />
			</RightContainer>
		</Box>
	);
}
/*


*/

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

export default OrderDetail;
