import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

// 별 다섯개
export function LongTextStar({ noText, star, average, count }) {
	const starData = star || 5;

	return (
		<StarContainer>
			<Icon>
				{new Array(starData).fill(0).map((el, i) => (
					<FaStar key={`${i.toString()}`} id={el} className="yellow-star" />
				))}
				{new Array(5 - starData).fill(0).map((el, i) => (
					<FaStar key={`${i.toString()}`} id={el} />
				))}
			</Icon>
			{!noText && (
				<>
					<Score>{average}</Score>
					<Count>{`(${count})`}</Count>
				</>
			)}
		</StarContainer>
	);
}

// 별 하나
export function ShortTextStar({ starAvg, reviewCount }) {
	const starData = starAvg || 0;
	const reviewCountData = reviewCount || 0;

	return (
		<StarContainer>
			<Icon>
				<FaStar className="yellow-star" />
			</Icon>
			<Score>{starData}</Score>
			<Count>({reviewCountData})</Count>
		</StarContainer>
	);
}

const Count = styled.div`
	color: var(--gray-200);
`;

const Score = styled.div`
	color: var(--orange-100);
	margin: 0 4px;
`;

const StarContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Icon = styled.div`
	& > svg {
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
