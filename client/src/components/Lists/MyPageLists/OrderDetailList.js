/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { useCallback, useState } from 'react';
import { LetterButtonColor } from '../../Buttons/LetterButton';
import Price from '../../Etc/Price';
import ReviewModal from '../../Modals/ReviewModal';

function OrderDetailList({
	inModal,
	brand,
	thumbnail,
	title,
	nowPrice,
	beforePrice,
	discountRate,
	orderId,
	capacity,
	quantity,
}) {
	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const review = {
		item: {
			orderId,
			brand,
			thumbnail,
			title,
			nowPrice,
			beforePrice,
			discountRate,
		},
	};

	return (
		<Box className={inModal && 'in-modal'}>
			<ImageContainer>
				<Image src={thumbnail} alt="상품 이미지" />
			</ImageContainer>
			<Wrap>
				<InformationForm>
					<Brand>{brand}</Brand>
					<Name>
						{title}, {capacity}정
					</Name>
					<Price fontSize="13px" nowPrice={price} />
				</InformationForm>
				<BottomContainer>
					<Total>
						{quantity && <Quantity>{quantity}개 / </Quantity>}
						<Price // 가격 * 수량
							nowPrice={nowPrice}
							beforePrice={beforePrice}
							discountRate={discountRate}
							fontSize="14px"
							fontWeight="Bold"
							quantity={quantity}
						/>
					</Total>
				</BottomContainer>
				{!inModal && (
					<ReviewContainer>
						<LetterButtonColor
							onClick={openModal}
							color="gray"
							colorcode="500"
							fontSize="13px"
						>
							리뷰 쓰기
						</LetterButtonColor>
						<IoIosArrowForward />
					</ReviewContainer>
				)}
				<ReviewModal
					modalIsOpen={modalIsOpen}
					setIsOpen={setIsOpen}
					OrderDetailList={OrderDetailList}
					review={review}
				/>
			</Wrap>
		</Box>
	);
}

const Box = styled.div`
	border-bottom: 1px solid rgb(235, 235, 235);
	background-color: white;
	width: 450px;
	height: 180px;
	display: flex;
	align-items: center;
	padding: 19px;
	* {
		color: var(--gray-600);
	}
	&.in-modal {
		width: 100%;
	}
`;

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
	width: 100%;
`;

const ImageContainer = styled.div`
	display: flex;
`;

const Image = styled.img`
	width: 120px;
	height: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InformationForm = styled.div`
	margin-bottom: 23px;
`;

const Brand = styled.div`
	color: var(--green-200);
	font-weight: var(--bold);
	margin-bottom: 4px;
`;

const Name = styled.div`
	font-weight: var(--bold);
	margin-bottom: 14px;
`;

const BottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Total = styled.div`
	display: flex;
	font-weight: var(--bold);
`;

const Quantity = styled.div`
	margin-right: 3px;
`;

const ReviewContainer = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	align-self: end;
	margin-top: 16px;
	* {
		color: var(--gray-500);
	}
`;

export default OrderDetailList;
