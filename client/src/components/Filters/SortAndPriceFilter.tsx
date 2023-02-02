import styled from 'styled-components';
import { PriceSortButton, SortButton } from './SortButton';

export default function SortAndPriceFilter() {
	return (
		<FilterBox>
			<PriceSortButton>가격 필터</PriceSortButton>
			<SortButton>정렬 방법</SortButton>
		</FilterBox>
	);
}

const FilterBox = styled.div`
	display: inline-flex;
	flex-direction: column;
	float: right;
	position: relative;
`;
