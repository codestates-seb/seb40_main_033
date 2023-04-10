/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LetterButtonColor } from '../../Buttons/LetterButton';
import Price from '../../Etc/Price';
import ReviewModal from '../../Modals/ReviewModal';
import { OrderDetailListProps } from '../../../types/order.type';

function OrderDetailList({
	inModal,
	brand,
	thumbnail,
	title,
	nowPrice,
	beforePrice,
	discountRate,
	itemOrderId, // 주문내역 속 개별아이템 주문id
	capacity,
	quantity,
	period,
	subscription,
	orderStatus,
	itemId,
}: OrderDetailListProps) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handlePageMove = useCallback(() => {
		navigate(`/detail/${itemId}`);
	}, []);

	const review = {
		item: {
			itemOrderId,
			brand,
			thumbnail,
			title,
			nowPrice,
			beforePrice,
			discountRate,
			capacity,
			quantity,
			itemId,
		},
	};

	return (
		<Box inModal={inModal}>
			<ImageContainer onClick={handlePageMove}>
				<Image src={thumbnail} alt="상품 이미지" />
			</ImageContainer>
			<Wrap>
				<InformationForm subscription={subscription}>
					<Brand>{brand}</Brand>
					<Name onClick={handlePageMove}>{`${title}${
						capacity && `, ${capacity}정`
					}`}</Name>
					<Price fontSize="13px" nowPrice={nowPrice} />
				</InformationForm>
				{subscription && <Period>{`${period}일 마다`}</Period>}
				<BottomContainer>
					<Total>
						{quantity && <Quantity>{quantity}개 / </Quantity>}
						<Price // 가격 * 수량
							nowPrice={nowPrice}
							beforePrice={nowPrice !== beforePrice && beforePrice}
							discountRate={nowPrice !== beforePrice && discountRate}
							fontSize="14px"
							fontWeight="Bold"
							quantity={quantity}
						/>
					</Total>
				</BottomContainer>
				{!inModal && orderStatus !== 'ORDER_CANCEL' && (
					<ReviewContainer>
						<LetterButtonColor
							onClick={openModal}
							color="gray"
							colorCode="500"
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
					List={OrderDetailList}
					review={review}
				/>
			</Wrap>
		</Box>
	);
}

const Box = styled.div<{ inModal?: boolean }>`
	border-bottom: 1px solid rgb(235, 235, 235);
	background-color: white;
	width: 450px;
	height: 180px;
	display: flex;
	align-items: center;
	padding: 18px 10px 18px 18px;
	width: ${({ inModal }) => (inModal ? '100%' : '450px')};
`;

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
	width: 100%;
	margin-top: 2px;
`;

const ImageContainer = styled.div`
	display: flex;
	cursor: pointer;
`;

const Image = styled.img`
	width: 120px;
	height: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InformationForm = styled.div<{ subscription: boolean }>`
	margin-bottom: ${({ subscription }) => (subscription ? '14px' : '23px')};
`;

const Brand = styled.div`
	color: var(--green-200);
	font-weight: var(--bold);
	margin-bottom: 4px;
`;

const Name = styled.div`
	font-weight: var(--bold);
	color: var(--gray-600);
	margin-bottom: 14px;
	cursor: pointer;
`;

const BottomContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Total = styled.div`
	display: flex;
	font-weight: var(--bold);
	align-items: center;
`;

const Period = styled.div`
	color: var(--purple-200);
	margin-bottom: 5px;
	font-size: 12px;
`;

const Quantity = styled.div`
	margin-right: 3px;
`;

const ReviewContainer = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	align-self: end;
	margin-top: 4px;
	* {
		color: var(--gray-500);
	}
`;

export default React.memo(OrderDetailList);
