import styled from 'styled-components';
import { useState } from 'react';
import CounterBtn from '../../Buttons/CounterButton';

function CartList() {
	const [isSub, setIsSub] = useState(true);

	return (
		<Box isSub={isSub}>
			<CheckBox>
				<Check type="checkbox" />
			</CheckBox>
			<Wrap isSub={isSub}>
				{isSub ? <SubBox /> : null}
				<MainBox>
					<Image> img </Image>
					<InformationForm>
						<Brand>California Gold Nutrition</Brand>
						<Name>오메가3 프리미엄 피쉬 오일</Name>
						<Price>6000원</Price>
					</InformationForm>
					<QuantityForm>
						<Quantity>수량</Quantity>
						<CounterBtn />
						<PriceBold>6000원</PriceBold>
					</QuantityForm>
				</MainBox>
			</Wrap>
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
	width: 850px;
	height: ${(props) => (props.isSub ? '274px' : '203px')};
	flex-direction: column;
	display: flex;
	justify-content: ${(props) => (props.isSub ? null : 'center')};
	align-items: center;
`;

const SubBox = styled.div`
	border: 1px solid blue;
	width: 849px;
	height: 90px;
`;

const MainBox = styled.div`
	margin-left: 29px;
	height: 163px;
	display: flex;
	align-items: center;
	font-size: 16px;
`;

const Image = styled.div`
	border: 2px solid green;
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
	border: 1px solid green;
	color: var(--green-200);
	font-weight: var(--bold);
`;

const Name = styled.div`
	border: 1px solid purple;
	margin-bottom: 25px;
	color: var(--gray-600);
	font-weight: var(--bold);
`;

const Price = styled.div`
	border: 1px solid red;
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
	border: 1px solid red;
	font-size: 20px;
	color: var(--gray-600);
	font-weight: var(--extrabold);
`;

export default CartList;
