import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { usePost } from '../../hooks/useFetch';

function WishlistButton({ isChecked, itemId, setIsChecked }) {
	const [request, setRequest] = useState(isChecked ? 0 : 1);
	const token = localStorage.getItem('accessToken');
	const { mutate } = usePost(`/wishes/${itemId}?wish=${request}`);

	const handleHeartClick = useCallback(() => {
		if (!token) {
			toast.error('로그인이 필요한 서비스입니다.');
			return;
		}
		mutate();
		if (setIsChecked) {
			setIsChecked(isChecked ? 0 : 1);
		}
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
			color: #ff555f;
			opacity: 100%;
			stroke-width: 0;
		}
	}
	& > svg {
		font-size: 18px;
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
