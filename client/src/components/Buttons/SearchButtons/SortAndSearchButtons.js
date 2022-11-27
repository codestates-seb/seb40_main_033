import styled from 'styled-components';
import { PriceSortButton, SortButton } from './SortButton';

export default function SortAndSearchButtons() {
	return (
		<ButtonsBox>
			<PriceSortButton>가격 필터</PriceSortButton>
			<SortButton>정렬 방법</SortButton>
		</ButtonsBox>
	);
}

const ButtonsBox = styled.div`
	display: inline-flex;
	flex-direction: column;
	float: right;
	position: relative;
`;
