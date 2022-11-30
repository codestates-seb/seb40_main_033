import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import CounterBtn from '../../Buttons/CounterButton';
import { DayControlTab } from '../../Tabs/TabButtons';
import Price from '../../Etc/Price';
import { KrDate } from '../../Etc/ListDate';
import CancelModal from '../../Modals/CancelModal';

function SubManagementList() {
	const price = 6000;
	const [quantity, setQuantity] = useState(1);
	const [openCancelModal, setOpenCancelModal] = useState(false);

	const onPlusClick = useCallback(() => {
		setQuantity(quantity + 1);
		toast.success('수량이 변경되었습니다.'); // 실제 요청에 붙이셔야 할 것 같아요~ 아마도
	}, [quantity]);

	const onMinusClick = useCallback(() => {
		setQuantity(quantity - 1);
		toast.success('수량이 변경되었습니다.'); // 실제 요청에 붙이셔야 할 것 같아요~ 아마도
	}, [quantity]);

	const handleModalOpen = useCallback(() => {
		setOpenCancelModal(true);
	}, []);

	// const handleCancel = useCallback(() => {
	// 	console.log('취소를 요청하는 함수를 CancelModal에 전달해주세요');
	// }, []);

	return (
		<Box>
			<CancelModal
				openCancelModal={openCancelModal}
				setOpenCancelModal={setOpenCancelModal}
				target="정기 구독"
			/>
			<SubContainer>
				<Label>구독 주기</Label>
				<DayControlTab />
				<IoMdClose onClick={handleModalOpen} />
			</SubContainer>
			<ListContainer>
				<Image
					src="https://wiselycompany.cafe24.com/web/product/medium/202211/46763d93d5fd373356268c62b05f5560.jpg"
					alt="상품 이미지"
				/>
				<RightContainer>
					<InfoContainer>
						<Info className="brand"> California Gold Nutrition</Info>
						<Info className="name">오메가3 프리미엄 피쉬 오일</Info>
						<Price nowPrice={price} />
					</InfoContainer>
					<BottomContainer>
						<Info className="notice">
							다음 배송일은 <KrDate date="2023-01-30T08:24:32.060555" /> 입니다.
						</Info>
						<QuantityContainer>
							<Label>수량</Label>
							<CounterBtn
								quantity={quantity}
								onPlusClick={onPlusClick}
								onMinusClick={onMinusClick}
							/>
						</QuantityContainer>
						<Price // 가격 * 수량
							nowPrice={price}
							quantity={quantity} // 수량!
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
