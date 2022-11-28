import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

// 별 다섯개
export function LongTextStar({ noText }) {
	return (
		<StarContainer>
			<Icon>
				<FaStar />
				<FaStar />
				<FaStar />
				<FaStar />
				<FaStar />
			</Icon>
			{!noText && (
				<>
					<Score>4.8</Score>
					<Count>(150)</Count>
				</>
			)}
		</StarContainer>
	);
}

// 별 하나
export function ShortTextStar() {
	return (
		<StarContainer>
			<Icon>
				<FaStar />
			</Icon>
			<Score>4.8</Score>
			<Count>(150)</Count>
		</StarContainer>
	);
}

const Count = styled.div`
	color: var(--gray-400);
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
		padding-top: 1px;
		font-size: 11px;
		path {
			color: var(--orange-100);
		}
	}
`;
