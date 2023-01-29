import styled from 'styled-components';
import { IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { LetterButtonColor } from '../../Buttons/LetterButton';
import { DotDate } from '../../Etc/ListDate';
import Price from '../../Etc/Price';
import CancelModal from '../../Modals/CancelModal';
import { useDelete } from '../../../hooks/useFetch';

function OrderList({ list }) {
	const navigate = useNavigate();
	const [openCancel, setOpenCancel] = useState(false);
	const { mutate, isLoading, isError, error, response } = useDelete(
		`/orders/${list.orderId}`,
	);

	const handlePageMove = useCallback(() => {
		navigate(`/detail/${list.item.itemId}`);
	}, []);

	// 상세로 이동
	const handleDetailClick = useCallback(() => {
		navigate(`/mypage/order/${list.orderId}`);
	}, []);

	// 취소 모달
	const handleCancelClick = useCallback(() => {
		setOpenCancel(true);
	}, []);

	// 주문 취소
	const handleCancel = useCallback(() => {
		mutate();
		setOpenCancel(false);
		toast.success('취소되었습니다.');
	}, []);

	const status = list.orderStatus.includes('CANCEL') ? '주문취소' : '주문완료';
	const totalNum = Number(list.totalItems);

	return (
		<Box>
			<Image
				src={list.item.thumbnail}
				alt="상품 이미지"
				onClick={handlePageMove}
			/>
			<MainContainer>
				<InfoContainer>
					<ShoppingInfo>
						<DeliveryStatus>{status}</DeliveryStatus>
						<DotDate date={list.createdAt} />
					</ShoppingInfo>
					<Name onClick={handlePageMove}>
						{`${list.item.brand}, ${list.item.title}, ${list.item.capacity}정 
						${totalNum > 1 ? `외 ${totalNum - 1}개` : ''}`}
					</Name>
					<Price nowPrice={list.expectPrice} isTotal />
				</InfoContainer>
				<BtnContainer>
					<IconBtnContainer onClick={handleDetailClick}>
						<LetterButtonColor
							color="gray"
							colorCode="500"
							fontSize="14px"
							hoverColor="gray"
							hoverColorCode="500"
							fontWeight="regular"
						>
							상세 보기
						</LetterButtonColor>
						<IoIosArrowForward />
					</IconBtnContainer>
					{status !== '주문취소' && (
						<IconBtnContainer onClick={handleCancelClick}>
							<LetterButtonColor
								color="red"
								colorCode="100"
								fontSize="14px"
								hoverColor="red"
								hoverColorCode="100"
								fontWeight="regular"
							>
								주문 취소
							</LetterButtonColor>
							<IoMdClose className="cancel" />
						</IconBtnContainer>
					)}
				</BtnContainer>
			</MainContainer>
			<CancelModal
				openCancelModal={openCancel}
				setOpenCancelModal={setOpenCancel}
				handleCancel={handleCancel}
				target="주문"
			/>
		</Box>
	);
}

const Box = styled.div`
	border-bottom: 1px solid #f1f1f1;
	background-color: white;
	width: 864px;
	height: 210px;
	padding: 20px 25px;
	display: flex;
	align-items: center;
`;

const MainContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const Image = styled.img`
	width: 160px;
	height: 160px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 30px;
`;

const ShoppingInfo = styled.div`
	display: flex;
	margin-bottom: 10px;
`;

const DeliveryStatus = styled.div`
	border-right: 1px solid var(--gray-200);
	padding-right: 6px;
	margin-right: 7px;
`;

const Name = styled.div`
	color: var(--gray-600);
	font-size: 16px;
	font-weight: var(--bold);
	margin-bottom: 20px;
	cursor: pointer;
`;

const BtnContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const IconBtnContainer = styled.div`
	margin: 3px;
	display: flex;
	align-items: center;
	cursor: pointer;

	button {
		margin-right: 16px;
	}

	svg {
		font-size: 15px;
	}

	.cancel {
		path {
			color: var(--red-100);
		}
	}
`;

export default OrderList;
