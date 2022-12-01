import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';
import { usePost } from '../../hooks/useFetch';

function WishlistButton({ isChecked, itemId }) {
	const { mutate: deleteMutate } = usePost(
		`http://localhost:3001/wishes/${itemId}?wish=0`,
	);
	const [isWanted, setIsWanted] = useState(isChecked);
	return (
		<WishBox>
			<FaHeart
				onClick={() => deleteMutate()}
				className={isWanted && 'red-heart'}
			/>
		</WishBox>
	);
}

const WishBox = styled.div`
	display: inline-flex;
	z-index: 99;
	.red-heart {
		path {
			color: #ff555f; //var(--red-100);
			opacity: 100%;
			stroke-width: 0;
		}
	}
	& > svg {
		font-size: 20px;
		path {
			cursor: pointer;
			stroke: var(--gray-300);
			color: var(--gray-200);
			stroke-width: 10px;
			opacity: 30%;
		}
	}
`;

export default WishlistButton;
