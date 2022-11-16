import styled, { css } from 'styled-components';
import { useState } from 'react';

function CounterBtn() {
	const [num, setNum] = useState(1);

	const DragPrevent = css`
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	`;

	const BtnContainer = styled.div`
		display: inline-flex;
		background: #ffffff;
		border: 0.5px solid var(--gray-200);
		border-radius: 6px;
		user-select: none; //
	`;

	const MinusBtn = styled.button`
		background-color: #ffffff;
		text-align: center;
		border: 0.5px solid var(--gray-200);
		width: 32px;
		height: 32px;
		border-radius: 6px 0 0 6px;
		&:active {
			background: var(--gray-100);
		}
		cursor: pointer;
		${DragPrevent};
	`;
	const NumDisplay = styled.div`
		text-align: center;
		width: 32px;
		height: 32px;
		line-height: 32px;
		border: 0.5px solid var(--gray-200);
		${DragPrevent};
	`;
	const PlusBtn = styled.button`
		background-color: #ffffff;
		text-align: center;
		border: 0.5px solid #d9d9d9;
		border-radius: 0 6px 6px 0;
		width: 32px;
		height: 32px;
		cursor: pointer;
	`;

	const onPlusClick = () => {
		setNum(num + 1);
	};
	const onMinusClick = () => {
		setNum(num - 1);
	};

	return (
		<BtnContainer>
			<MinusBtn onClick={onMinusClick} disabled={num === 1}>
				-
			</MinusBtn>
			<NumDisplay>{num}</NumDisplay>
			<PlusBtn onClick={onPlusClick} disabled={num === 99}>
				+
			</PlusBtn>
		</BtnContainer>
	);
}

export default CounterBtn;
