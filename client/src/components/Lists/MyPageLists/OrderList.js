import styled from 'styled-components';
import { IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { LetterButtonColor } from '../../Buttons/LetterButton';
import ListDate from '../../Etc/ListDate';
import Price from '../../Etc/Price';

function OrderList({ list }) {
	const navigate = useNavigate();

	const handleDetailBtnClick = () => {
		navigate(`${list.orderId}`);
	};

	return (
		<Box>
			<Image src={list.itemOrders[0].item.thumbnail} alt="상품 이미지" />
			<MainContainer>
				<InformationForm>
					<ShoppingInfo>
						<DeliveryStatus>{list.orderStatus}</DeliveryStatus>
						<ListDate date={list.createdAt} />
					</ShoppingInfo>
					<Name>
						{list.itemOrders[0].item.brand}, {list.itemOrders[0].item.title}{' '}
						{list.itemOrders.length > 1
							? `외 ${list.itemOrders.length - 1}개`
							: null}
					</Name>
					<Price nowPrice={list.itemOrders[0].item.price} isTotal />
				</InformationForm>
				<BtnContainer>
					<IconBtnContainer onClick={handleDetailBtnClick}>
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
					{list.orderStatus === '주문완료' ? (
						<IconBtnContainer>
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
					) : null}
				</BtnContainer>
			</MainContainer>
		</Box>
	);
}

const Box = styled.div`
	border-bottom: 1px solid rgb(235, 235, 235);
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
`;

const InformationForm = styled.div`
	width: 450px;
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
