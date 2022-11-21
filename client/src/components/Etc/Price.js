import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

// 할인상품일 경우 beforePrice: 원래가격, nowPrice: 할인적용가
// 일반상품일 경우 nowPrice: 정상가
function Price({ nowPrice, beforePrice, discountRate }) {
	return (
		<PriceContainer>
			<NowPrice>{Number(nowPrice).toLocaleString('ko-KR') || '6,000'}</NowPrice>
			<IoIosArrowBack />
			<BeforePrice>
				{Number(beforePrice).toLocaleString('ko-KR') || '12,000'}
			</BeforePrice>
			<Percent>{'50%' || discountRate}</Percent>
		</PriceContainer>
	);
}

const PriceContainer = styled.div`
	display: flex;
	align-items: center;

	svg {
		path {
			color: var(--gray-300);
		}
	}

	& > * {
		font-size: 16px;
		margin-right: 2px;
	}
`;

const NowPrice = styled.div`
	font-size: 16px;
`;

const BeforePrice = styled.del`
	color: var(--gray-300);
`;

const Percent = styled.div`
	color: var(--red-100);
	margin-left: 5px;
	font-weight: var(--bold);
`;

export default Price;
