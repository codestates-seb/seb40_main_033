import styled from 'styled-components';
import PayLists from '../Lists/PayLists';
import PayPageContainer from './PayPageContainer';

export default function PayItemInformation({ payData, isSub }) {
	const orderedItems = payData.itemOrders.data;
	console.log(orderedItems, 'orderedItems');
	return (
		<PayPageContainer Info="상품 정보">
			<ListContainer>
				{orderedItems.map((orderedItem, idx) => (
					<PayLists
						key={`${orderedItem.itemOrderId}`}
						orderedItem={orderedItem}
						{...(isSub && { isSub: 'isSub' })}
					/>
				))}
			</ListContainer>
		</PayPageContainer>
	);
}

const ListContainer = styled.article`
	display: flex;
	flex-direction: column;

	width: 454px;
	height: 540px;
	overflow: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
