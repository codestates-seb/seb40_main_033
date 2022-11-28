import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useCallback, useState } from 'react';

function WishlistButton({ isChecked }) {
	const [isWanted, setIsWanted] = useState({ isChecked });
	const handleClick = useCallback(() => {
		setIsWanted(!isWanted);
	}, [isWanted]);
	return (
		<WishBox>
			<FaHeart
				onClick={handleClick}
				className={isWanted ? 'red-heart' : null}
			/>
		</WishBox>
	);
}

const WishBox = styled.div`
	display: inline-flex;
	z-index: 1;
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
