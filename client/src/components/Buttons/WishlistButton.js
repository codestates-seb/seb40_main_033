import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { usePost } from '../../hooks/useFetch';

function WishlistButton({ isChecked, itemId, setIsChecked }) {
	const [request, setRequest] = useState(isChecked ? 0 : 1);
	const { mutate, response } = usePost(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/wishes/${itemId}?wish=${request}`,
	);
	const handleHeartClick = useCallback(() => {
		mutate();
		if (setIsChecked) {
			setIsChecked(!isChecked);
		}
		console.log('response', response);
	}, [isChecked]);

	return (
		<WishBox>
			<FaHeart
				onClick={handleHeartClick}
				className={isChecked && 'red-heart'}
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
