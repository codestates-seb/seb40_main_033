import ItemCard from './ItemCard';
import { CardItem } from '../../types/main.type';

function SmallListCards({ item }: { item: CardItem }) {
	return <ItemCard item={item} fontSize="14px" />;
}

export default SmallListCards;
