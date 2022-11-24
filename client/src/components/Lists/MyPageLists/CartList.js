import styled from 'styled-components';
import { useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import CounterBtn from '../../Buttons/CounterButton';
import { DayShowTab } from '../../Tabs/TabButtons';

function CartList() {
	const price = 6000;
	const [isSub, setIsSub] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const onPlusClick = () => {
		setQuantity(quantity + 1);
	};
	const onMinusClick = () => {
		setQuantity(quantity - 1);
	};

	return (
		<Box isSub={isSub}>
			<CheckBox>
				<Check type="checkbox" />
			</CheckBox>
			<Wrap isSub={isSub}>
				{isSub ? (
					<SubBox>
						<SubWrap>
							<Text>구독 주기</Text>
							<DayShowTab />
						</SubWrap>
					</SubBox>
				) : null}
				<MainBox>
					<Image> img </Image>
					<InformationForm>
						<Brand>California Gold Nutrition</Brand>
						<Name>오메가3 프리미엄 피쉬 오일</Name>
						<Price>{price} 원</Price>
					</InformationForm>
					<QuantityForm>
						<Quantity>수량</Quantity>
						<CounterBtn
							quantity={quantity}
							onPlusClick={onPlusClick}
							onMinusClick={onMinusClick}
						/>
						<PriceBold>{price * quantity}원</PriceBold>
					</QuantityForm>
				</MainBox>
			</Wrap>
			<DeleteBtn isSub={isSub}>
				<TfiClose />
			</DeleteBtn>
		</Box>
	);
}

const Box = styled.div`
	background-color: white;
	width: 864px;
	height: ${(props) => (props.isSub ? '274px' : '203px')};
	display: flex;
	align-items: center;
`;

const CheckBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Check = styled.input`
	border: 1px solid var(--gray-400);
	margin: auto;
	width: 13px;
	height: 13px;
`;

const Wrap = styled.div`
	border-bottom: 1px solid rgb(235, 235, 235);
	width: 850px;
	height: ${(props) => (props.isSub ? '274px' : '203px')};
	flex-direction: column;
	display: flex;
	justify-content: ${(props) => (props.isSub ? null : 'center')};
	align-items: center;
`;

const SubBox = styled.div`
	width: 849px;
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SubWrap = styled.div`
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
`;

const Text = styled.div`
	font-size: 16px;
	margin-right: 10px;
	color: var(--gray-500);
`;

const MainBox = styled.div`
	margin-left: 29px;
	height: 163px;
	display: flex;
	align-items: center;
	font-size: 16px;
`;

const Image = styled.div`
	border: 1px solid green;
	width: 163px;
	height: 163px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InformationForm = styled.div`
	width: 254px;
	height: 163px;
	flex-direction: column;
	display: flex;
	justify-content: space-between;
	padding: 44px 26px;
`;

const Brand = styled.div`
	color: var(--green-200);
	font-weight: var(--bold);
`;

const Name = styled.div`
	margin-bottom: 25px;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const Price = styled.div`
	color: var(--gray-600);
	font-weight: var(--regular);
`;

const QuantityForm = styled.div`
	width: 402px;
	height: 32px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 50px;
	margin-top: 140px;
`;

const Quantity = styled.div`
	margin-left: 15px;
	color: var(--gray-500);
	font-weight: var(--regular);
`;

const PriceBold = styled.div`
	font-size: 20px;
	color: var(--gray-600);
	font-weight: var(--extraBold);
`;

const DeleteBtn = styled.button`
	font-size: 11px;
	border: none;
	background-color: white;
	color: var(--gray-400);
	position: relative;
	right: 35px;
	bottom: ${(props) => (props.isSub ? '116px' : '80px')};
	cursor: pointer;
`;

export default CartList;
