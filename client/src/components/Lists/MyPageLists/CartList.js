/* eslint-disable no-unused-expressions */
import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CounterBtn from '../../Buttons/CounterButton';
import { DayShowTab } from '../../Tabs/TabButtons';
import Price from '../../Etc/Price';
import CancelModal from '../../Modals/CancelModal';
import { useDelete, usePatch } from '../../../hooks/useFetch';

function CartList({ data, item, sub }) {
	const [quantity, setQuantity] = useState(data.quantity);
	const [openCancelModal, setOpenCancelModal] = useState(false);
	const [isChecked, setChecked] = useState(data.buyNow);
	const [period, setPeriod] = useState(data.period);
	const navigate = useNavigate();

	const { mutate: quantityPlus } = usePatch(
		`/carts/itemcarts/${data.itemCartId}?upDown=+1`,
	);

	const { mutate: quantityMinus } = usePatch(
		`/carts/itemcarts/${data.itemCartId}?upDown=-1`,
	);

	const { mutate: deleteCart } = useDelete(
		`/carts/itemcarts/${data.itemCartId}?subscription=${
			sub ? 'true' : 'false'
		}`,
	);

	const { mutate: patchCheck } = usePatch(
		`/carts/itemcarts/exclude/${data.itemCartId}?buyNow=${isChecked}`,
	);

	const { mutate: patchPeriod } = usePatch(
		`/carts/itemcarts/period/${data.itemCartId}?period=${period}`,
	);

	const handleItemClick = () => {
		navigate(`/detail/${item.itemId}`);
	};

	const onPlusClick = useCallback(() => {
		setQuantity(quantity + 1);
		quantityPlus();
		toast.success('수량이 증가되었습니다.');
	}, [quantity]);

	const onMinusClick = useCallback(() => {
		setQuantity(quantity - 1);
		quantityMinus();
		toast.success('수량이 감소되었습니다.');
	}, [quantity]);

	const handleModalOpen = useCallback(() => {
		setOpenCancelModal(true);
	}, []);

	const handleCancel = useCallback(() => {
		deleteCart();
		setOpenCancelModal(false);
		toast.error('삭제되었습니다.');
	}, []);

	const handleCheck = async () => {
		await setChecked(!isChecked);
		await patchCheck();
	};

	const handlePeriodClick = useCallback(
		async (e) => {
			await setPeriod(e.target.innerText.replace('일', ''));
			await patchPeriod();
		},
		[period],
	);

	return (
		<Box>
			<CancelModal
				openCancelModal={openCancelModal}
				setOpenCancelModal={setOpenCancelModal}
				target="장바구니"
				handleCancel={handleCancel}
			/>
			<SubContainer>
				{sub && (
					<>
						<Label>구독 주기</Label>
						<DayShowTab
							onClick={handlePeriodClick}
							currentIdx={data.period / 30 - 1}
						/>
					</>
				)}
				<IoMdClose onClick={handleModalOpen} />
			</SubContainer>
			<ListContainer>
				<input type="checkbox" checked={isChecked} onChange={handleCheck} />
				<Image
					src={item.thumbnail}
					alt="상품 이미지"
					onClick={handleItemClick}
				/>
				<RightContainer>
					<InfoContainer>
						<Info className="brand">{item.brand}</Info>
						<Info className="name" onClick={handleItemClick}>
							{item.title}
						</Info>
						<Price
							nowPrice={item.disCountPrice}
							beforePrice={item.price}
							discountRate={item.discountRate}
						/>
					</InfoContainer>
					<BottomContainer>
						<QuantityContainer>
							<Label>수량</Label>
							<CounterBtn
								quantity={quantity}
								onPlusClick={onPlusClick}
								onMinusClick={onMinusClick}
							/>
						</QuantityContainer>
						<Price // 가격 * 수량
							nowPrice={item.disCountPrice}
							quantity={data.quantity}
							fontSize="20px"
							fontWeight="extraBold"
						/>
					</BottomContainer>
				</RightContainer>
			</ListContainer>
		</Box>
	);
}

const Box = styled.div`
	border-bottom: 1px solid #f1f1f1;
	background-color: white;
	width: 864px;
	padding: 30px 25px 35px 25px;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const SubContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
	position: relative;
	width: 100%;

	// X 아이콘
	& > :last-child {
		position: absolute;
		top: -6px;
		right: -4px;
		font-size: 16px;
		cursor: pointer;
		* {
			color: var(--gray-300);
		}
	}
`;

const Label = styled.label`
	font-size: 16px;
	margin-right: 22px;
`;

const Info = styled.div`
	font-size: 16px;

	&.brand {
		color: var(--green-200);
		font-weight: var(--bold);
		margin-bottom: 10px;
	}

	&.name {
		color: var(--gray-600);
		font-weight: var(--bold);
	}

	&.notice {
		color: var(--gray-400);
		font-size: 13px;
		font-weight: var(--regular);
	}
`;

const ListContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 160px; // 임시
`;

const Image = styled.img`
	width: 160px;
	height: 160px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: 10px;
	margin-left: 30px;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	// 2번째 자식 요소 호버시 커서 변경
	& > :nth-child(2) {
		cursor: pointer;
	}
	& > :nth-child(3) {
		margin: 20px 0 22px 0; // 가격 컴포넌트
	}
`;

const BottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	position: relative;

	& > :last-child {
		position: absolute;
		right: 0;
	}
`;

const QuantityContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	right: 160px;
`;

export default CartList;
