import styled, { keyframes } from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
	starAvg,
	reviewCount,
	handleMoveToReview,
}) {
	const navigate = useNavigate();
	const [path, setPath] = useState(''); // 바로결제하기 클릭 시, 이동할 페이지
	const [showOptions, setShowOptions] = useState(false);
	const [openCartModal, setOpenCartModal] = useState(false);
	const token = localStorage.getItem('accessToken');
	const [orderList, setOrdertList] = useState({
		quantity: 1,
		period: 30,
		subscription: false,
	});

	const { data: WishData } = useGet('/wishes/item', `detail/wishs`);

	const [isCheckedWish, setIsCheckedWish] = useState(
		WishData?.data?.data.includes(itemId) ? 1 : 0,
	);

	useEffect(() => {
		if (WishData?.data?.data.includes(itemId)) {
			setIsCheckedWish(1);
		} else {
			setIsCheckedWish(0);
		}
	}, []);

	const { mutate: cartMu, response: cartRes } = usePost(`/carts/${itemId}`);

	const { mutate: purMu } = usePurchase('/orders/single', path);

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

	// * 결제 요청 후, 결제 페이지로 가는 함수
	const handlePayClick = useCallback(() => {
		if (token) {
			purMu({ ...orderList, itemId });
		} else {
			toast.error('로그인이 필요한 서비스입니다.');
		}
	}, [orderList]);

	// * 장바구니 요청 후, 모달을 띄우는 함수
	const handleOpenModalClick = useCallback(() => {
		if (token) {
			cartMu({ ...orderList });
			setOpenCartModal(true);
		} else {
			toast.error('로그인이 필요한 서비스입니다.');
		}
	}, [orderList]);

	// * 장바구니 페이지로 가는 함수
	const handleCartClick = useCallback(() => {
		if (orderList.subscription) {
			navigate('/cart/subscription');
		} else {
			navigate('/cart/normal');
		}
	}, [orderList]);

	// // 로그인 모달을 띄우는 함수
	// const handleOpenLoginModal = () => {
	// 	if (!token) {
	// 		setOpenLoginModal(true);
	// 	}
	// };

	// 로그인 모달 속, 로그인 페이지로 가는 함수
	// const handleLoginMove = useCallback(() => {
	// 	navigate('/login');
	// }, []);

	return (
		<Container>
			<EntireContainer showOptions={showOptions}>
				<MainContainer>
					<HeadBox>
						<p>{brand}</p>
						<WishlistButton
							setIsChecked={setIsCheckedWish}
							isChecked={isCheckedWish}
							itemId={itemId}
						/>
					</HeadBox>
					<MiddleBox>
						<NameBox>{name}</NameBox>
						<DescBox>{content}</DescBox>
						<TagsBox>
							<Tag funcArr={categories} />
						</TagsBox>
						<RateBox>
							<LongTextStar
								star={Math.floor(starAvg)}
								average={starAvg}
								count={reviewCount}
								onClick={handleMoveToReview}
							/>
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
				setOpenModal={setOpenCartModal}
				openModal={openCartModal}
				contents="장바구니에 상품이 담겼습니다."
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
