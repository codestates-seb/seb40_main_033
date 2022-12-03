import React, { useCallback, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

function BtnStar({ star, handleStar }) {
	const [clickedStar, setClickedStar] = useState('');
	const [hoveredStar, setHoveredStar] = useState('');

	useEffect(() => {
		setClickedStar(star);
	}, []);

	const handleStarClick = useCallback((e) => {
		if (e.target.localName === 'path') {
			return;
		}

		if (e.target.id === clickedStar) {
			setClickedStar(''); // 현재 누른 게 아까 누른 점수와 동일하다면 점수 초기화(0)
		} else {
			setClickedStar(e.target.id);
		}
		handleStar(e);
	}, []);

	const handleStarHover = useCallback((e) => {
		setHoveredStar(e.target.id);
	}, []);

	return (
		<StarContainer>
			<div>별점을 매겨주세요</div>
			<Icon>
				{['1', '2', '3', '4', '5'].map((el) => (
					<FaStar
						key={el}
						id={el}
						onClick={handleStarClick}
						onMouseLeave={handleStarHover}
						className={
							clickedStar >= el || hoveredStar >= el ? 'yellow-star' : null
						}
					/>
				))}
			</Icon>
		</StarContainer>
	);
}

const StarContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 40px 2px 0 0;
`;

const Icon = styled.button`
	border: none;
	background: none;
	margin-left: 3px;

	& > svg {
		font-size: 17px;

		&.yellow-star {
			path {
				color: var(--orange-100);
				pointer-events: none; // 이벤트 버블링 방지
			}
		}

		path {
			color: var(--gray-200);
			pointer-events: none; // 이벤트 버블링 방지
		}
	}
`;

export default BtnStar;
