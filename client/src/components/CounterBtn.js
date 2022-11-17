import styled, { css } from 'styled-components';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function CounterBtn() {
	const [num, setNum] = useState(1);

	const BtnContainer = styled.div`
		display: inline-flex;
		background: #ffffff;
		margin-left: 50%;
		margin-top: 25%; //위 두 속성은 단지 편하게 보기 위한 속성입니다. 실제로는 삭제해야 합니다.
	`;

	const MinusBtn = styled.button`
		background-color: #ffffff;
		border: 0.5px solid var(--gray-200);
		width: 32px;
		height: 32px;
		border-radius: 6px 0 0 6px;
		&:active {
			background: var(--gray-100);
		}
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	`;
	const NumDisplay = styled.div`
		text-align: center;
		width: 32px;
		height: 32px;
		line-height: 32px;
		border-top: 0.5px solid var(--gray-200);
		border-bottom: 0.5px solid var(--gray-200);
		cursor: pointer;
	`;
	const PlusBtn = styled.button`
		background-color: #ffffff;
		border: 0.5px solid var(--gray-200);
		border-radius: 0 6px 6px 0;
		width: 32px;
		height: 32px;
		cursor: pointer;
		&:active {
			background: var(--gray-100);
		}
		display: flex;
		justify-content: center;
		align-items: center;
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
				<AiOutlineMinus />
			</MinusBtn>
			<NumDisplay>{num}</NumDisplay>
			<PlusBtn onClick={onPlusClick} disabled={num === 99}>
				<AiOutlinePlus />
			</PlusBtn>
		</BtnContainer>
	);
}

export default CounterBtn;
