import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import WishListCards from '../../components/Lists/WishListCards';
import { useGet } from '../../hooks/useFetch';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';

function WishList() {
	const { pathname } = useLocation();
	const {
		isLoading,
		isError,
		data: wishListItems,
		error,
	} = useGet('/wishes', pathname);
	if (isLoading) return <LoadingSpinner />;
	if (isError)
		return <PendingBox className="error">{error.message}</PendingBox>;
	return (
		<EntireContainer>
			<WishBox>
				{wishListItems.data.data.map((wishItem, idx) => (
					<WishListCards
						item={wishItem}
						key={`${idx.toString()}-${wishItem}`}
					/>
				))}
			</WishBox>
			{wishListItems.data.length === 0 && (
				<PendingBox>찜한 상품이 없습니다!</PendingBox>
			)}
		</EntireContainer>
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

const PendingBox = styled.div`
	width: 100%;
	height: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 24px;
	color: var(--purple-300);
	&.error {
		color: var(--red-100);
	}
`;
export default WishList;
