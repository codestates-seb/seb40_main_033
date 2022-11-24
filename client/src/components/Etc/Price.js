import styled, { css } from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

// nowPrice가 언제나 판매가입니다!
// 할인상품일 경우 nowPrice: 할인적용가, beforePrice: 할인 전 원래가격
// 일반상품일 경우 nowPrice: 정상가
// isTotal값을 받을 경우 총 ~~~~ 원으로 표시됩니다.
function Price({
	nowPrice,
	beforePrice,
	discountRate,
	isTotal,
	fontSize,
	fontWeight,
	quantity,
}) {
	return (
		<PriceContainer fontSize={fontSize} fontWeight={fontWeight}>
			{isTotal ? <Total>총</Total> : null}
			<div>
				{Number(quantity ? nowPrice * quantity : nowPrice).toLocaleString(
					'ko-KR',
				)}
			</div>
			<div>원</div>
			{beforePrice ? (
				<>
					<IoIosArrowBack />
					<BeforePrice>
						{Number(beforePrice).toLocaleString('ko-KR')}
					</BeforePrice>
					<Percent>{discountRate}</Percent>
				</>
			) : null}
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
		margin-right: 2px;
		color: var(--gray-600);
		font-size: 16px;
		${({ fontSize, fontWeight }) => css`
			font-size: ${fontSize};
			font-weight: ${`var(--${fontWeight})`};
		`};
	}
`;

const Total = styled.div`
	margin-right: 8px;
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
