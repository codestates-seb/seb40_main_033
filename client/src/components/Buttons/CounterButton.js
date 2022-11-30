import styled from 'styled-components';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

function CounterBtn({ quantity, onPlusClick, onMinusClick }) {
	return (
		<BtnContainer>
			<MinusBtn onClick={onMinusClick} disabled={quantity === 1}>
				<AiOutlineMinus />
			</MinusBtn>
			<NumDisplay>{quantity}</NumDisplay>
			<PlusBtn onClick={onPlusClick} disabled={quantity === 99}>
				<AiOutlinePlus />
			</PlusBtn>
		</BtnContainer>
	);
}

const BtnContainer = styled.div`
	display: inline-flex;
	background: #ffffff;
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
	font-size: 16px;
	text-align: center;
	width: 32px;
	height: 32px;
	line-height: 32px;
	border-top: 0.5px solid var(--gray-200);
	border-bottom: 0.5px solid var(--gray-200);
	cursor: default;
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

export default CounterBtn;
