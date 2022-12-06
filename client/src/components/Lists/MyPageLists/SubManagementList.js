import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CounterBtn from '../../Buttons/CounterButton';
import { DayControlTab } from '../../Tabs/TabButtons';
import Price from '../../Etc/Price';
import { KrDate } from '../../Etc/ListDate';
import CancelModal from '../../Modals/CancelModal';
import { useDelete, usePatch } from '../../../hooks/useFetch';

function SubManagementList({ subManageData }) {
	const navigate = useNavigate();
	const handleItemClick = () => {
		navigate(`/detail/${subManageData.item.itemId}`);
	};
	const [quantity, setQuantity] = useState(subManageData.quantity);
	const [openCancelModal, setOpenCancelModal] = useState(false);
	const [subPeriod, setSubPeriod] = useState(subManageData.period);
	const { mutate: plusMutate } = usePatch(
		`/orders/subs/${subManageData.itemOrderId}?upDown=1`,
	);
	const { mutate: minusMutate } = usePatch(
		`/orders/subs/${subManageData.itemOrderId}?upDown=-1`,
	);
	const { mutate: modifyPeriod } = usePatch(
		`/schedule/change?period=${subPeriod}&orderId=${subManageData.orderId}&itemOrderId=${subManageData.itemOrderId}`,
	);
	const { mutate: deleteSub } = useDelete(
		`/schedule/cancel?orderId=${subManageData.orderId}&itemOrderId=${subManageData.itemOrderId}`,
	);
	const onPlusClick = useCallback(async () => {
		await plusMutate();
		setQuantity(quantity + 1);
		toast.success('수량이 변경되었습니다.'); // 실제 요청에 붙이셔야 할 것 같아요~ 아마도
	}, [quantity]);

	const onMinusClick = useCallback(async () => {
		await minusMutate();
		setQuantity(quantity - 1);
		toast.success('수량이 변경되었습니다.'); // 실제 요청에 붙이셔야 할 것 같아요~ 아마도
	}, [quantity]);

	const handleModifyPeriod = useCallback(
		async (e) => {
			await setSubPeriod(e.target.innerText.replace('일', ''));
			await modifyPeriod();
			toast.success('주기를 변경했습니다!');
		},
		[subPeriod],
	);

	const handleModalOpen = useCallback(() => {
		setOpenCancelModal(true);
	}, []);
	const handleCancel = useCallback(() => {
		deleteSub();
		setOpenCancelModal(false);
	}, []);

	return (
		<Box>
			<CancelModal
				handleCancel={handleCancel}
				openCancelModal={openCancelModal}
				setOpenCancelModal={setOpenCancelModal}
				target="정기 구독"
			/>
			<SubContainer>
				<Label>구독 주기</Label>
				<DayControlTab
					orderId={subManageData.orderId}
					itemOrderId={subManageData.itemOrderId}
					onClick={handleModifyPeriod}
					currentIdx={subManageData.period / 30 - 1}
				/>
				<IoMdClose onClick={handleModalOpen} />
			</SubContainer>
			<ListContainer>
				<Image
					src={subManageData.item.thumbnail}
					alt="상품 이미지"
					onClick={handleItemClick}
				/>
				<RightContainer>
					<InfoContainer>
						<Info className="brand"> {subManageData.item.brand}</Info>
						<Info className="name" onClick={handleItemClick}>
							{subManageData.item.title}
						</Info>
						<Price
							nowPrice={subManageData.item.disCountPrice}
							quantity={1}
							discountRate={subManageData.item.discountRate}
							beforePrice={subManageData.item.price}
						/>
					</InfoContainer>
					<BottomContainer>
						<Info className="notice">
							다음 배송일은 <KrDate date={subManageData.nextDelivery} /> 입니다.
						</Info>
						<QuantityContainer>
							<Label>수량</Label>
							<CounterBtn
								quantity={subManageData.quantity}
								onPlusClick={onPlusClick}
								onMinusClick={onMinusClick}
							/>
						</QuantityContainer>
						<Price // 가격 * 수량
							nowPrice={subManageData.item.disCountPrice}
							quantity={subManageData.quantity} // 수량!
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
		cursor: pointer;
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
		margin-right: 10px;
	}
`;

const QuantityContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	right: 160px;
`;

export default SubManagementList;
