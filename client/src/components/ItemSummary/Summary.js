import styled, { css } from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import WishlistBtn from '../Buttons/WishlistButton';
import FuncTag from '../Buttons/TagButton';
import { BlackButton, WhiteButton } from '../Buttons/BlackButton';
import CounterBtn from '../Buttons/CounterButton';
import { DayShowTab } from '../Tabs/TabButtons';

function Summary() {
	const func = ['장 건강', '위 건강', '장 건강', '위 건강', '장 건강']; // 걍 임시로 받아놓는 효능 나중에 수정해야함
	const price = 16000; // 나중에 let으로 바꿔줘야 할 수도..
	const [quantity, setQuantity] = useState(1);
	const [isVisible, setIsVisible] = useState(1); // 나중에 0으로 바꿔주세요
	// const onPlusClick = () => {
	// 	setQuantity(quantity + 1);
	// };
	const onPlusClick = useCallback(() => setQuantity(quantity + 1), [quantity]); // useCallback을 사용해서 다시 만듬. 이 함수는 반복생성x. 반복생성되었으면 console.log가 계속 찍혔을 것.
	// const onMinusClick = () => {
	// 	setQuantity(quantity - 1);
	// };
	const onMinusClick = useCallback(() => setQuantity(quantity - 1), [quantity]);
	const onClick = () => {
		if (isVisible === 1) {
			setIsVisible(0);
		} else {
			setIsVisible(1);
		}
	};
	// useEffect(() => {
	// 	// useCallback이 잘 실행되고 있는지 확인하기 위한 장치입니다. 나중에 다 보시거든 그냥 없애버리세요!
	// 	console.log('다시됨');
	// }, [onPlusClick]);
	return (
		<EntireContainer test>
			<MainContainer>
				<HeadBox>
					<p>
						California Gold Nutrition
						{/* 나중에 상품 브랜드를 받아서 바꿔줘야 합니다. */}
					</p>
					<WishlistBtn />
				</HeadBox>
				<MiddleBox>
					{/* <div className="itemName">멀티비타민</div> */}
					<NameBox>멀티비타민</NameBox>
					<DescBox>
						필수 영양소 멀티비타민&미네랄 20종. 활력충전을 위한 고함량 비타민
						B군
					</DescBox>
					<FuncBox>
						<FuncTag funcArr={func} />
					</FuncBox>
					<RateBox>
						<div>별점임...</div>
						<PriceBox>{price.toLocaleString('ko-KR')}원</PriceBox>
					</RateBox>
				</MiddleBox>
				<ButtomBox>
					<BlackButton onClick={onClick}>정기구독</BlackButton>
					<WhiteButton onClick={onClick}>일반구매</WhiteButton>
				</ButtomBox>
			</MainContainer>
			<HiddenContainer isVisible={isVisible}>
				<HiddenContentBox>
					<DayShowTab fonSize="14px" />
					<CountBox>
						<QuantityTextBox>수량</QuantityTextBox>
						<CounterBtn
							quantity={quantity}
							onPlusClick={onPlusClick}
							onMinusClick={onMinusClick}
						/>
					</CountBox>
					<TotalBox>총 {(price * quantity).toLocaleString('ko-KR')}원</TotalBox>
					<ButtomBox>
						<BlackButton>장바구니 담기</BlackButton>
						<WhiteButton>바로 구매하기</WhiteButton>
					</ButtomBox>
				</HiddenContentBox>
			</HiddenContainer>
		</EntireContainer>
	);
}

const EntireContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 369px;
	padding: 33px 33px 19px 33px;
	position: relative; // 히든컨테이너를 숨기기 위해서
`;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 46px;
	z-index: 1; // 숨겨진 히든컨테이너가 안 눌리게 하려구..
	background-color: white;
`;
const HeadBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 19px; // MiddleBox와의 간격
	p {
		font-size: 20px;
		color: var(--green-200);
	}
`;

const MiddleBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	margin-bottom: 22px;
	/* .itemName {
		font-size: 36px;
		font-weight: var(--extraBold);
		margin-bottom: 22px
	} */
`;

const NameBox = styled.div`
	font-size: 36px;
	font-weight: var(--extraBold);
	margin-bottom: 19px; // DescBox와의 간격
`;

const DescBox = styled.div`
	font-size: 20px;
	color: var(--gray-300);
	margin-bottom: 19px;
`;
const FuncBox = styled.div`
	margin-bottom: 31px;
`;

const RateBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 300px;
`;

const PriceBox = styled.div`
	display: inline-flex;
	font-size: 36px;
	font-weight: var(--extraBold);
`;

const ButtomBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const HiddenContainer = styled.div`
	display: flex;
	flex-direction: column;
	transition: 0.3s ease-in-out;
	width: 303px;
	padding-bottom: 19px;
	position: absolute; //
	/* height: 168px; */
	top: ${({ isVisible }) => (isVisible === 1 ? '403.5px' : '250.5px')};
	${({ isVisible }) => css`
		opacity: ${isVisible};
	`};
`;
const HiddenContentBox = styled.div`
	display: flex;
	flex-direction: column;
	height: 110px;
	justify-content: space-between;
	& > :first-child {
		margin-bottom: 36px;
	}
`;

const CountBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const QuantityTextBox = styled.div`
	font-size: 28px;
	font-weight: var(--extraBold);
`;

const TotalBox = styled.div`
	font-size: 30px;
	font-weight: var(--extraBold);
	margin-left: 10px;
	align-self: flex-end;
	margin: 36px 0;
`;
export default Summary;
