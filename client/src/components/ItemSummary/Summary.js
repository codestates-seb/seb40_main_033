import styled, { css, keyframes } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import WishlistButton from '../Buttons/WishlistButton';
import Tag from '../Etc/Tag';
import { BlackButton, WhiteButton } from '../Buttons/BlackButton';
import CounterBtn from '../Buttons/CounterButton';
import { DayShowTab } from '../Tabs/TabButtons';
import { LongTextStar } from '../Stars/TextStar';
import Price from '../Etc/Price';

/*
							name={item.title}
							brand={item.brand}
							categories={item.categories.map((el) => el.categoryName)}
							content={item.content}
							nowPrice={item.discountPrice}
							discountRate={item.discountRate}
							beforePrice={item.price}
*/

function Summary() {
	const func = ['장 건강', '위 건강', '장 건강', '위 건강', '장 건강']; // 걍 임시로 받아놓는 효능 나중에 수정해야함
	const price = 16000; // 나중에 let으로 바꿔줘야 할 수도..
	const [quantity, setQuantity] = useState(1);
	const [showOptions, setShowOptions] = useState(false); // 나중에 0으로 바꿔주세요
	const [isSub, setIsSub] = useState(false);

	const handlePlusClick = useCallback(
		() => setQuantity(quantity + 1),
		[quantity],
	);

	const handleMinusClick = useCallback(
		() => setQuantity(quantity - 1),
		[quantity],
	);

	// const handleOutsideClick = useCallback((e) => {
	// 	console.log(
	// 		'ref.current.contains(e.target)',
	// 		ref.current.contains(e.target),
	// 	);
	// 	if (showOptions && !ref.current.contains(e.target)) {
	// 		setShowOptions(false);
	// 	}
	// 	console.log(e.target.innerText);
	// }, []);

	const handleTypeClick = useCallback(
		(e) => {
			setShowOptions(!showOptions);
			if (e.target.innerText === '정기구독') {
				setIsSub(true);
			} else {
				setIsSub(false);
			}
		},
		[showOptions],
	);

	return (
		<Container>
			<EntireContainer>
				<MainContainer>
					<HeadBox>
						<p>
							California Gold Nutrition
							{/* 나중에 상품 브랜드를 받아서 바꿔줘야 합니다. */}
						</p>
						<WishlistButton />
					</HeadBox>
					<MiddleBox>
						{/* <div className="itemName">멀티비타민</div> */}
						<NameBox>멀티비타민</NameBox>
						<DescBox>
							필수 영양소 멀티비타민&미네랄 20종. 활력충전을 위한 고함량 비타민
							B군
						</DescBox>
						<TagsBox>
							<Tag funcArr={func} />
						</TagsBox>
						<RateBox>
							<LongTextStar />
							<Price nowPrice={price} fontSize="32px" fontWeight="extraBold" />
						</RateBox>
					</MiddleBox>
					<ButtonBox>
						<BlackButton onClick={handleTypeClick}>정기구독</BlackButton>
						<WhiteButton onClick={handleTypeClick}>일반구매</WhiteButton>
					</ButtonBox>
				</MainContainer>
				{showOptions && (
					<HiddenContainer>
						{isSub && <DayShowTab fonSize="14px" />}
						<CountBox>
							<QuantityTextBox>수량</QuantityTextBox>
							<CounterBtn
								quantity={quantity}
								onPlusClick={handlePlusClick}
								onMinusClick={handleMinusClick}
							/>
						</CountBox>
						<TotalBox>
							<Price
								nowPrice={price}
								quantity={quantity}
								isTotal
								fontSize="30px"
								fontWeight="extraBold"
							/>
						</TotalBox>
						<ButtonBox>
							<BlackButton>장바구니 담기</BlackButton>
							<WhiteButton>바로 구매하기</WhiteButton>
						</ButtonBox>
					</HiddenContainer>
				)}
			</EntireContainer>
		</Container>
	);
}
const Container = styled.div`
	position: sticky;
	top: 120px;

	/* overflow: visible; */
	/* height: 400px; */
`;

const EntireContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: sticky;
	top: 120px;
	/* position: -webkit-sticky; */
	width: 370px;
	padding: 34px;
	/* border: 1px solid red; */
`;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	/* z-index: 1; // 숨겨진 히든컨테이너가 안 눌리게 하려구.. */
	background-color: white;
`;

const HeadBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 16px; // MiddleBox와의 간격

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
`;

const NameBox = styled.div`
	font-size: 36px;
	font-weight: var(--extraBold);
	margin-bottom: 22px; // DescBox와의 간격
`;

const DescBox = styled.div`
	font-size: 18px;
	color: var(--gray-300);
	margin-bottom: 20px;
	line-height: 1.4;
`;

const TagsBox = styled.div`
	margin-bottom: 50px;
`;

const RateBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;
`;

const ButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

const slide = keyframes`
0% {
	opacity: 0%;
	transform: translateY(-40px);
}
100% {
	opacity: 100%;
	transform: translateY(0px);
}
`;

const HiddenContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 50px;
	animation: ${slide} 0.25s ease-in-out;
	& > :first-child {
		margin-bottom: 40px;
	}
`;

const CountBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40px;
`;

const QuantityTextBox = styled.div`
	font-size: 26px;
	font-weight: var(--bold);
`;

const TotalBox = styled.div`
	align-self: flex-end;
	font-size: 30px;
	font-weight: var(--extraBold);
	margin-bottom: 35px;
`;

export default Summary;
