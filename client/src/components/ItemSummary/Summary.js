import styled, { keyframes } from 'styled-components';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WishlistButton from '../Buttons/WishlistButton';
import Tag from '../Etc/Tag';
import { BlackButton, WhiteButton } from '../Buttons/BlackButton';
import CounterBtn from '../Buttons/CounterButton';
import { DayShowTab } from '../Tabs/TabButtons';
import { LongTextStar } from '../Stars/TextStar';
import Price, { SummaryPrice } from '../Etc/Price';
import CartModal from '../Modals/CartModal';
import { usePost, useGet } from '../../hooks/useFetch';
import usePurchase from '../../hooks/usePurchase';

function Summary({
	name,
	brand,
	categories,
	content,
	nowPrice,
	beforePrice,
	discountRate,
	itemId,
}) {
	const navigate = useNavigate();
	const [path, setPath] = useState(''); // 바로결제하기 클릭 시, 이동할 페이지
	const [showOptions, setShowOptions] = useState(false);
	const [wish, setWish] = useState(
		'유저가 찜누른 아이템id 리스트 조회해서 대조',
	);
	const [openModal, setOpenModal] = useState(false);
	const [modalContents, setModalContents] =
		useState('장바구니에 상품이 담겼습니다.'); // 장바구니에 이미 담겼을 때 변경
	const [orderList, setOrdertList] = useState({
		quantity: 1,
		period: 30,
		subscription: false,
	});
	/*
	! 바로 구매하기
	{
    "itemId": 1,
    "quantity": 3,
    "period": 30,
    "subscription": false
	}
	! 장바구니에 담기 (정기)
	{
    "quantity":3,
    "period":30,
    "subscription":true
	}
	! 장바구니에 담기 (일반)
	{
    "quantity":3,
    "subscription":false
	}
	
	*/
	const {
		mutate: cartMu,
		response: cartRes,
		isLoading: cartLoading,
		isError: cartIsErr,
		error: cartErr,
	} = usePost(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/carts/${itemId}`,
	);

	const {
		mutate: purMu,
		isLoading: purLoading,
		isSuccess: purSuccess,
		isError: purIsErr,
	} = usePurchase(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/orders/single',
		path,
	);

	// * 수량 +
	const handlePlusClick = useCallback(() => {
		setOrdertList({ ...orderList, quantity: orderList.quantity + 1 });
	}, [orderList]);

	// * 수량 -
	const handleMinusClick = useCallback(() => {
		setOrdertList({ ...orderList, quantity: orderList.quantity - 1 });
	}, [orderList]);

	// * 주기 선택
	const handlePeriodClick = useCallback(
		(e) => {
			setOrdertList({
				...orderList,
				period: Number(e.target.innerText.replace('일', '')),
				subscription: true,
			});
		},
		[orderList],
	);

	// * 일반/정기 선택
	const handleTypeClick = useCallback(
		(e) => {
			setShowOptions(!showOptions);
			if (!showOptions && e.target.innerText === '정기구독') {
				setOrdertList({ ...orderList, period: 30, subscription: true });
				setPath('subscription');
			} else if (!showOptions && e.target.innerText === '일반구매') {
				setOrdertList({ ...orderList, subscription: false });
				setPath('normal');
			}
		},
		[showOptions, orderList],
	);

	// * path 변경
	// const handleParamsChange = useCallback(
	// 	(e) => {
	// 		if (e.target.innerText === '바로 구매하기') {
	// 			setPath('/pay/normal');
	// 		} else if (e.target.innerText === '장바구니 담기') {
	// 			setPath('/pay/subscription');
	// 		}
	// 	},
	// 	[path],
	// );

	console.log('path', path);

	// * 결제 요청 후, 결제 페이지로 가는 함수
	const handlePayClick = useCallback(() => {
		console.log('📌 결제 요청 보낼 데이터!!', { ...orderList, itemId });
		console.log('결제되면 이리로 가세요', path);
		purMu({ ...orderList, itemId });
		// console.log('response', response);

		// if (response) {
		// 	if (orderList.subscription) {
		// 		navigate('/pay/subscription', { state: response.data.data });
		// 	} else {
		// 		navigate('/pay/normal', { state: response.data.data });
		// 	}
		// }
	}, [path]);

	/*
		! 장바구니에 담기 (정기)
	{
    "quantity":3,
    "period":30,
    "subscription":true
	}
	! 장바구니에 담기 (일반)
	{
    "quantity":3,
    "subscription":false
	}
	*/
	// * 장바구니 요청 후, 모달을 띄우는 함수
	const handleOpenModalClick = useCallback(() => {
		console.log('📌 장바구니로 보낼 데이터!', orderList);
		cartMu({ ...orderList });
		console.log('장바구니 요청 응답!', cartRes);
		setOpenModal(true);
	}, []);

	// * 장바구니 페이지로 가는 함수
	const handleCartClick = useCallback(() => {
		if (orderList.subscription) {
			// http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/carts/{item-id}
			navigate('/cart/subscription');
		} else {
			navigate('/cart/normal');
		}
	}, [orderList.subscription]);

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }

	// if (isError) {
	// 	return <div>Error: {error.message}</div>;
	// }

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
							<SummaryPrice
								nowPrice={nowPrice}
								beforePrice={beforePrice !== nowPrice && beforePrice}
								discountRate={discountRate !== 0 && `${discountRate}%`}
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
						{orderList.subscription && (
							<DayShowTab onClick={handlePeriodClick} fonSize="14px" />
						)}
						<CountBox>
							<QuantityTextBox>수량</QuantityTextBox>
							<CounterBtn
								quantity={orderList.quantity}
								onPlusClick={handlePlusClick}
								onMinusClick={handleMinusClick}
							/>
						</CountBox>
						<TotalBox>
							<Price
								nowPrice={nowPrice}
								quantity={orderList.quantity}
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
	top: ${({ showOptions }) => (showOptions ? '2%' : '16%')};
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
	width: 100%;
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
	word-break: keep-all;
	font-size: 36px;
	font-weight: var(--extraBold);
	margin-bottom: 22px; // DescBox와의 간격
	line-height: 1.2;
`;

const DescBox = styled.div`
	font-size: 16px;
	color: var(--gray-300);
	margin-bottom: 30px;
	line-height: 1.4;
`;

const TagsBox = styled.div`
	margin-bottom: 50px;
`;

const RateBox = styled.div`
	display: flex;
	justify-content: space-between;
	/* align-items: center; */
	width: 100%;
	margin-bottom: 10px;
`;

const ButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
	/* width: 100%; */
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
