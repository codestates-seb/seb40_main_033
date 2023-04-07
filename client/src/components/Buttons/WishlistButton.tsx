import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { usePost } from '../../hooks/useFetch';
import { WishlistBtnProps } from '../../types/button.type';

function WishlistButton({
	isChecked,
	itemId,
	setIsChecked,
	setOpenLoginModal,
}: WishlistBtnProps) {
	const [request, setRequest] = useState(isChecked ? 0 : 1);
	const token = localStorage.getItem('accessToken');
	const { mutate } = usePost(`/wishes/${itemId}?wish=${request}`);

	const handleHeartClick = () => {
		if (!token && setOpenLoginModal) {
			setOpenLoginModal(true);
			return;
		}

		mutate();

		if (setIsChecked) {
			setIsChecked(!isChecked);
		}
	};

	useEffect(() => {
		setRequest(isChecked ? 0 : 1);
	}, [isChecked]);

	return (
		<WishBox>
			<FaHeart
				onClick={handleHeartClick}
				className={isChecked ? 'red-heart' : ''}
			/>
		</WishBox>
	);
}

const WishBox = styled.div`
	display: inline-flex;
	z-index: 2;

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

	.red-heart {
		path {
			color: #ff555f;
			opacity: 100%;
			stroke-width: 0;
		}
	}
`;

export default WishlistButton;
