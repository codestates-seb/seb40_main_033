/* eslint-disable no-nested-ternary */
import { CardItem } from '../../types/main.type';
import ItemCard from './ItemCard';

function MainListCard({ item }: { item: CardItem }) {
	return <ItemCard item={item} main fontSize="16px" />;
}

export default MainListCard;
