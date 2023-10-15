import ItemCard from './ItemCard';
import { CardItem } from '../../types/main.type';

function WishListCards({ item }: { item: CardItem }) {
	return <ItemCard item={item} wishBtn fontSize="13px" />;
}

export default WishListCards;
