/* eslint-disable no-mixed-spaces-and-tabs */
import styled, { css } from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { PriceProps, SummaryPriceProps } from '../../types/price.type';

// nowPrice가 언제나 판매가입니다!
// 할인상품일 경우 nowPrice: 할인적용가, beforePrice: 할인 전 원래가격
// 일반상품일 경우 nowPrice: 정상가
// isTotal값을 받을 경우 총 ~~~~ 원으로 표시됩니다.
function Price({
	nowPrice,
	beforePrice,
	discountRate,
	isTotal, // 총액인지
	quantity, // 수량
	minus, // 앞에 -가 붙는 지 (결제 정보!)
	fontSize,
	fontWeight,
}: PriceProps) {
	return (
		<PriceContainer
			className={minus ? 'minus' : ''}
			fontSize={fontSize}
			fontWeight={fontWeight}
		>
			{isTotal && <Label>총</Label>}
			{minus && <Label>-</Label>}
			<div className="white">{`${Number(
				quantity ? nowPrice * quantity : nowPrice,
			).toLocaleString('ko-KR')}원`}</div>

			{beforePrice && discountRate !== 0 && (
				<>
					<IoIosArrowBack className="white" />
					<BeforePrice className="beforeDiscounted">
						{quantity
							? `${(Number(beforePrice) * Number(quantity)).toLocaleString(
									'ko-KR',
							  )} 원`
							: `${Number(beforePrice).toLocaleString('ko-KR')}원`}
					</BeforePrice>
					<Percent>{`${discountRate}%`}</Percent>
				</>
			)}
		</PriceContainer>
	);
}

export function SummaryPrice({
	nowPrice,
	beforePrice,
	discountRate,
	fontSize,
	fontWeight,
}: SummaryPriceProps) {
	return (
		<PriceContainer
			className="summary"
			fontSize={fontSize}
			fontWeight={fontWeight}
		>
			{beforePrice && (
				<BeforeContainer>
					<BeforePrice className="beforeDiscounted summary">
						{`${Number(beforePrice).toLocaleString('ko-KR')}원`}
					</BeforePrice>
					<Percent className="summary">{`${discountRate}%`}</Percent>
				</BeforeContainer>
			)}
			<div>{`${Number(nowPrice).toLocaleString('ko-KR')}원`}</div>
		</PriceContainer>
	);
}

const PriceContainer = styled.div<{
	fontSize?: string;
	fontWeight?: string;
}>`
	display: flex;
	align-items: center;
	position: relative;

	svg {
		path {
			color: var(--gray-300);
		}
	}

	& > * {
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

	&.summary {
		flex-direction: column;
	}
`;

const BeforeContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	position: absolute;
	top: -24px;
	width: 100%;
	.summary {
		font-size: 16px;
		margin-bottom: 8px;
	}
`;

const Label = styled.label`
	margin-right: 7px;
`;

const BeforePrice = styled.del`
	color: var(--gray-300);
`;

const Percent = styled.div`
	color: var(--red-100) !important;
	margin-left: 6px;
	font-weight: var(--bold);
`;

export default Price;
