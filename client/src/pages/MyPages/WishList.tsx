import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import WishListCards from '../../components/Cards/WishListCard';
import { useGet } from '../../hooks/useFetch';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';
import { NO_WISH_LIST } from '../../assets/Constants';
import { Item } from '../../types/itemList.type';

interface WishListData {
	data: Item[];
}
function WishList() {
	const { pathname } = useLocation();
	const { isLoading, isError, data, error } = useGet<WishListData>(
		'/wishes',
		pathname,
	);
	const wishListItems = data?.data?.data;
	if (isLoading) return <LoadingSpinner />;
	if (isError && error instanceof Error) return <div>{error.message}</div>;
	return wishListItems !== undefined ? (
		<EntireContainer>
			<WishBox>
				{wishListItems.map((wishItem, idx) => (
					<WishListCards
						item={wishItem}
						key={`${idx.toString()}-${wishItem}`}
					/>
				))}
			</WishBox>
		</EntireContainer>
	) : (
		<ListContainer>
			<div className="blank">{NO_WISH_LIST}</div>
		</ListContainer>
	);
}
const EntireContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const WishBox = styled.main`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
`;

const ListContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4px;
	margin: 0px 0 75px 0;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	width: 872px;

	& > {
		:last-child {
			border: none;
		}
	}

	.blank {
		height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}
`;
export default WishList;
