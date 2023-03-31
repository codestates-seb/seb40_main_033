import styled from 'styled-components';
import ShoppingList from '../Lists/ShoppingList';
import PayPageContainer from './PayPageContainer';
import { PayData } from '../../types/payment.type';

interface PayItemInformationProps {
	payData: PayData;
	isSub: boolean;
}
export default function PayItemInformation({
	payData,
	isSub,
}: PayItemInformationProps) {
	const orderedItems = payData.itemOrders.data;
	return (
		<PayPageContainer Info="상품 정보">
			<ListContainer>
				{orderedItems.map((orderedItem) => (
					<ShoppingList
						isSub={isSub}
						talk={false}
						key={`${orderedItem.itemOrderId}`}
						brand={orderedItem.item.brand}
						thumbnail={orderedItem.item.thumbnail}
						title={orderedItem.item.title}
						price={orderedItem.item.discountPrice}
						capacity={orderedItem.item.capacity}
						quantity={orderedItem.quantity}
						beforePrice={orderedItem.item.price}
						discountRate={orderedItem.item.discountRate}
						period={orderedItem.period}
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
