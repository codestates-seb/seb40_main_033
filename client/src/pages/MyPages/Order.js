import styled from 'styled-components';
import { ToggleTab } from '../../components/Tabs/TabButtons';
import OrderList from '../../components/Lists/MyPageLists/OrderList';
import Pagination from '../../components/Etc/Pagination';

// 주문내역
function Order() {
	return (
		<>
			<ToggleTab />
			<ListContainer>
				<OrderList />
				<OrderList />
				<OrderList />
				<OrderList />
				<OrderList />
				<OrderList />
				<OrderList />
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

	&:last-child {
		// 마지막 리스트의 border-bottom 제거!
	}
`;

export default Order;
