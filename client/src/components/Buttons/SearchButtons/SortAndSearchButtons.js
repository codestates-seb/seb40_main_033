import styled from 'styled-components';
import { PriceSortButton, SortButton } from './SortButton';

export default function SortAndSearchButtons({ refetch }) {
	return (
		<ButtonsBox>
			<PriceSortButton refetch={refetch}>가격 필터</PriceSortButton>
			<SortButton refetch={refetch}>정렬 방법</SortButton>
		</ButtonsBox>
	);
}

const ButtonsBox = styled.div`
	display: inline-flex;
	flex-direction: column;
	float: right;
	position: relative;
`;
