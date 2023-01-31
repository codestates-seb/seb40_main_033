import React, { useCallback, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

interface StarProps {
	star: string;
	handleStar: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

function BtnStar({ star, handleStar }: StarProps) {
	const [clickedStar, setClickedStar] = useState('');
	const [hoveredStar, setHoveredStar] = useState('');

	useEffect(() => {
		setClickedStar(star);
	}, []);

	const handleStarClick = useCallback(
		(e: React.MouseEvent<SVGElement, MouseEvent>) => {
			const eventTarget = e.target as HTMLButtonElement;
			if (eventTarget.localName === 'path') {
				return;
			}

			if (eventTarget.id === clickedStar) {
				setClickedStar(''); // 현재 누른 게 아까 누른 점수와 동일하다면 점수 초기화(0)
			} else {
				setClickedStar(eventTarget.id);
			}
			handleStar(e);
		},
		[],
	);

	const handleStarHover = useCallback(
		(e: React.MouseEvent<SVGElement, MouseEvent>) => {
			setHoveredStar((e.target as HTMLButtonElement).id);
		},
		[],
	);

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
							clickedStar >= el || hoveredStar >= el ? 'yellow-star' : ''
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
