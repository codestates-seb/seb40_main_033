import styled, { css } from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

// nowPrice가 언제나 판매가입니다!
// 할인상품일 경우 nowPrice: 할인적용가, beforePrice: 할인 전 원래가격
// 일반상품일 경우 nowPrice: 정상가
// isTotal값을 받을 경우 총 ~~~~ 원으로 표시됩니다.
function Price({
	nowPrice,
	beforePrice,
	discountRate, // 할인율
	isTotal, // 총액인지
	quantity, // 수량
	minus, // 앞에 -가 붙는 지 (결제 정보!)
	fontSize,
	fontWeight,
}) {
	return (
		<PriceContainer
			className={minus && 'minus'}
			fontSize={fontSize}
			fontWeight={fontWeight}
		>
			{isTotal && <Label>총</Label>}
			{minus && <Label>-</Label>}
			<div>
				{Number(quantity ? nowPrice * quantity : nowPrice).toLocaleString(
					'ko-KR',
				)}
			</div>
			<div>원</div>
			{beforePrice && (
				<>
					<IoIosArrowBack />
					<BeforePrice>
						{Number(beforePrice).toLocaleString('ko-KR')}
					</BeforePrice>
					<Percent>{discountRate}</Percent>
				</>
			)}
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

	&.minus {
		& > * {
			color: var(--purple-300);
		}
	}
`;

const Label = styled.label`
	margin-right: 7px;
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
