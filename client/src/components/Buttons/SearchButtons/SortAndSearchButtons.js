import styled from 'styled-components';
import { PriceSortButton, SortButton } from './SortButton';

export default function SortAndSearchButtons() {
	return (
		<ButtonsBox>
			<div>
				<PriceSortButton>가격 필터</PriceSortButton>
			</div>

			<div>
				<SortButton>정렬 방법</SortButton>
			</div>
		</ButtonsBox>
	);
}

const ButtonsBox = styled.div`
	display: inline-flex;
	flex-direction: column;
	float: right;
`;
