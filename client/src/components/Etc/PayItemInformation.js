import styled from 'styled-components';
import PayLists from '../Lists/PayLists';
import PayPageContainer from './PayPageContainer';

export default function PayItemInformation({ payData, isSub }) {
	const orderedItems = payData.itemOrders.data;
	return (
		<PayPageContainer Info="상품 정보">
			<ListContainer>
				{orderedItems.map((orderedItem) => (
					<PayLists
						key={`${orderedItem.itemOrderId}`}
						brand={orderedItem.item.brand}
						thumbnail={orderedItem.item.thumbnail}
						title={orderedItem.item.title}
						price={orderedItem.item.disCountPrice}
						capacity={orderedItem.item.capacity}
						quantity={orderedItem.quantity}
						beforePrice={orderedItem.item.price}
						discountRate={orderedItem.item.discountRate}
						period={orderedItem.period}
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
