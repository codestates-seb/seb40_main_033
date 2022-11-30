import styled, { keyframes } from 'styled-components';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistButton from '../Buttons/WishlistButton';
import Tag from '../Etc/Tag';
import { BlackButton, WhiteButton } from '../Buttons/BlackButton';
import CounterBtn from '../Buttons/CounterButton';
import { DayShowTab } from '../Tabs/TabButtons';
import { LongTextStar } from '../Stars/TextStar';
import Price from '../Etc/Price';
import CartModal from '../Modals/CartModal';

function Summary({
	name,
	brand,
	categories,
	content,
	nowPrice,
	beforePrice,
	discountRate,
}) {
	const [quantity, setQuantity] = useState(1);
	const [showOptions, setShowOptions] = useState(false);
	const [isSub, setIsSub] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [modalContents, setModalContents] =
		useState('장바구니에 상품이 담겼습니다.'); // 장바구니에 이미 담겼을 때 변경
	const navigate = useNavigate();

	const handlePlusClick = useCallback(() => {
		setQuantity(quantity + 1);
	}, [quantity]);

	const handleMinusClick = useCallback(() => {
		setQuantity(quantity - 1);
	}, [quantity]);

	const handleTypeClick = useCallback(
		(e) => {
			setShowOptions(!showOptions);
			if (e.target.innerText === '정기구독') {
				setIsSub(true);
			} else if (e.target.innerText === '일반구매') {
				setIsSub(false);
			}
		},
		[showOptions],
	);

	// 결제 페이지로 가는 함수
	const handlePayClick = useCallback(() => {
		if (isSub) {
			navigate('/pay/subscription');
		} else {
			navigate('/pay/normal');
		}
	}, [isSub]);

	// 장바구니 모달을 띄우는 함수
	const handleOpenModalClick = useCallback(() => {
		setOpenModal(true);
	}, []);

	// 장바구니 페이지로 가는 함수
	const handleCartClick = useCallback(() => {
		if (isSub) navigate('/cart/subscription');
		else navigate('/cart/normal');
	}, [isSub]);

	return (
		<Container>
			<EntireContainer showOptions={showOptions}>
				<MainContainer>
					<HeadBox>
						<p>
							{brand || 'California Gold Nutrition'}
							{/* 나중에 상품 브랜드를 받아서 바꿔줘야 합니다. */}
						</p>
						<WishlistButton />
					</HeadBox>
					<MiddleBox>
						{/* <div className="itemName">멀티비타민</div> */}
						<NameBox>{name || '멀티비타민'}</NameBox>
						<DescBox>
							{content ||
								'필수 영양소 멀티비타민&미네랄 20종. 활력충전을 위한 고함량 비타민 B군'}
						</DescBox>
						<TagsBox>
							<Tag funcArr={categories} />
						</TagsBox>
						<RateBox>
							<LongTextStar />
							<Price
								nowPrice={nowPrice}
								// beforePrice={beforePrice}
								// discountRate={`${discountRate}%`}
								percent
								fontSize="32px"
								fontWeight="extraBold"
							/>
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
								nowPrice={nowPrice}
								quantity={quantity}
								isTotal
								fontSize="30px"
								fontWeight="extraBold"
							/>
						</TotalBox>
						<ButtonBox>
							<BlackButton onClick={handleOpenModalClick}>
								장바구니 담기
							</BlackButton>
							<WhiteButton onClick={handlePayClick}>바로 구매하기</WhiteButton>
						</ButtonBox>
					</HiddenContainer>
				)}
			</EntireContainer>
			<CartModal
				setOpenModal={setOpenModal}
				openModal={openModal}
				contents={modalContents}
				onClickPbtn={handleCartClick}
			/>
		</Container>
	);
}
const Container = styled.div`
	position: sticky;
`;

const EntireContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: sticky;
	top: ${({ showOptions }) => (showOptions ? '3%' : '16%')};
	transition: 0.4s;
	width: 370px;
	padding: 34px;

	@media screen and (min-height: 900px) {
		top: ${({ showOptions }) => (showOptions ? '10%' : '20%')};
	}
`;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
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
