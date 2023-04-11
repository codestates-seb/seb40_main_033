import styled, { keyframes } from 'styled-components';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WishlistButton from '../Buttons/WishlistButton';
import Tag from '../Etc/Tag';
import { BlackButton, WhiteButton } from '../Buttons/BlackButton';
import CounterBtn from '../Buttons/CounterButton';
import { PeriodChoiceTab } from '../Tabs/ToggleTabs';
import { LongTextStar } from '../Stars/TextStar';
import Price, { SummaryPrice } from '../Etc/Price';
import CartModal from '../Modals/CartModal';
import useGetWishes from '../../hooks/useGetWishes';
import { usePost } from '../../hooks/useFetch';
import usePurchase from '../../hooks/usePurchase';
import LoginModal from '../Modals/LoginModal';

interface ItemSummaryProps {
	name: string;
	brand: string;
	categories: string[];
	content: string;
	nowPrice: number;
	beforePrice: number;
	discountRate: number | boolean;
	itemId: number;
	starAvg: number;
	reviewCount: number;
	handleMoveToReview: React.MouseEventHandler<HTMLDivElement>;
}

function ItemSummary({
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
}: ItemSummaryProps) {
	const navigate = useNavigate();
	const [path, setPath] = useState(''); // 바로결제하기 클릭 시, 이동할 페이지
	const [showOptions, setShowOptions] = useState(false);
	const [openCartModal, setOpenCartModal] = useState(false);
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const token = localStorage.getItem('accessToken');
	const [orderList, setOrdertList] = useState({
		quantity: 1,
		period: 30,
		subscription: false,
	});

	const { data: WishData } = useGetWishes<{ data: number[] }>(
		'/wishes/item',
		`detail/wishs`,
	);

	const [isCheckedWish, setIsCheckedWish] = useState(
		!!WishData?.data?.data.includes(itemId),
	);

	useEffect(() => {
		setIsCheckedWish(!!WishData?.data?.data.includes(itemId));
	}, [WishData]);

	const { mutate: cartMu } = usePost(`/carts/${itemId}`);
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
	const handlePeriodClick: React.MouseEventHandler<HTMLLIElement> = useCallback(
		(e) => {
			const { innerText } = e.target as HTMLLIElement;
			setOrdertList({
				...orderList,
				period: Number(innerText.replace('일', '')),
				subscription: true,
			});
		},
		[orderList],
	);

	// * 일반/정기 선택
	const handleTypeClick: React.MouseEventHandler<HTMLButtonElement> =
		useCallback(
			(e) => {
				const { innerText } = e.target as HTMLButtonElement;
				setShowOptions(!showOptions);
				if (!showOptions && innerText === '정기구독') {
					setOrdertList({ ...orderList, period: 30, subscription: true });
					setPath('subscription');
				} else if (!showOptions && innerText === '일반구매') {
					setOrdertList({ ...orderList, subscription: false });
					setPath('normal');
				}
			},
			[showOptions, orderList],
		);

	// * 결제 요청 후, 결제 페이지로 가는 함수
	const handlePayClick: React.MouseEventHandler<HTMLButtonElement> =
		useCallback(() => {
			if (token) {
				purMu({ ...orderList, itemId });
			} else {
				setOpenLoginModal(true);
			}
		}, [orderList]);

	// * 장바구니 요청 후, 모달을 띄우는 함수
	const handleOpenModalClick = useCallback(() => {
		if (token) {
			cartMu({ ...orderList });
			setOpenCartModal(true);
		} else {
			setOpenLoginModal(true);
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

	return (
		<Container>
			<EntireContainer showOptions={showOptions}>
				<MainContainer>
					<HeadBox>
						<p>{brand}</p>
						<WishlistButton
							setOpenLoginModal={setOpenLoginModal}
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
								discountRate={discountRate !== 0 && discountRate}
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
							<PeriodChoiceTab
								onClick={handlePeriodClick}
								currentIdx={orderList.period / 30 - 1}
							/>
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
				setIsModalOpen={setOpenCartModal}
				IsModalOpen={openCartModal}
				onClickPbtn={handleCartClick}
			/>
			<LoginModal
				setIsModalOpen={setOpenLoginModal}
				IsModalOpen={openLoginModal}
			/>
		</Container>
	);
}
const Container = styled.div`
	position: sticky;
`;

const EntireContainer = styled.div<{ showOptions: boolean }>`
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

export default ItemSummary;
