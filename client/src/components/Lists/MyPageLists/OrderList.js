import styled from 'styled-components';
import { IoIosArrowForward, IoMdClose } from 'react-icons/io';
import { LetterButtonColor } from '../../Buttons/LetterButton';
import ListDate from '../../Etc/ListDate';
import Price from '../../Etc/Price';

function OrderList() {
	return (
		<Box>
			<ImageContainer>
				<Image> img </Image>
			</ImageContainer>
			<MainContainer>
				<InformationForm>
					<ShoppingInfo>
						<DeliveryStatus>배송완료</DeliveryStatus>
						<ListDate date="2022-11-23T15:30:25" />
					</ShoppingInfo>
					<Name>
						California Gold Nutrition, 오메가3 프리미엄 피쉬 오일 외 3개
					</Name>
					<Price nowPrice="6000" isTotal />
				</InformationForm>
				<BtnContainer>
					<IconBtnContainer>
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

const ImageContainer = styled.div`
	display: flex;
`;

const Image = styled.div`
	border: 1px solid green;
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
