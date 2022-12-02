/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { LetterButtonColor } from '../../Buttons/LetterButton';
import { DotDate } from '../../Etc/ListDate';
import { LongTextStar } from '../../Stars/TextStar';
import OrderDetailList from './OrderDetailList';
import ReviewModal from '../../Modals/ReviewModal';
import DeleteNotesModal from '../../Modals/DeleteNotesModal';
import { useDelete } from '../../../hooks/useFetch';

function MyPageReviewList({ review }) {
	const [openForm, setOpenForm] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const { mutate } = useDelete(
		// 'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/reviews/mypage',
		'http://localhost:3001/reviews',
	);

	const handleFormOpen = () => {
		setOpenForm(!openForm);
	};

	const handleDeleteClick = useCallback(() => {
		setOpenDeleteModal(true);
	}, []);

	// review 삭제 요청!
	const handleDelete = useCallback(() => {
		mutate();
		setOpenDeleteModal(false);
	}, []);

	return (
		<Box>
			<Image src={review.item.thumbnail} alt="상품 이미지" />
			<ListContainer>
				<TopContainer>
					<NameContainer>
						<Info className="brand">{review.item.brand}</Info>
						<Info className="name">{review.item.title}</Info>
					</NameContainer>
					<ButtonContainer>
						<LetterButtonColor onClick={handleFormOpen} fontSize="12px">
							수정
						</LetterButtonColor>
						<span />
						<LetterButtonColor onClick={handleDeleteClick} fontSize="12px">
							삭제
						</LetterButtonColor>
					</ButtonContainer>
				</TopContainer>
				<InfoContainer>
					<LongTextStar noText star={review.star} />
					<DotDate date={review.createdAt} />
				</InfoContainer>
				<Review>{review.content}</Review>
				<ReviewModal
					setIsOpen={setOpenForm}
					modalIsOpen={openForm}
					OrderDetailList={OrderDetailList}
					review={review}
				/>
				<DeleteNotesModal
					openDeleteModal={openDeleteModal}
					setOpenDeleteModal={setOpenDeleteModal}
					handleDelete={handleDelete}
				/>
			</ListContainer>
		</Box>
	);
}

const Box = styled.li`
	background-color: white;
	width: 100%;
	display: flex;
	/* flex-direction: column; */
	align-items: center;
	padding: 30px;
	border-bottom: 1px solid #f1f1f1;
`;

const Image = styled.img`
	min-width: 160px;
	height: 160px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	/* height: 160px; // 임시 */
	margin-left: 30px;
`;

const NameContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Info = styled.div`
	font-size: 16px;

	&.brand {
		color: var(--green-200);
		margin-bottom: 5px;
	}

	&.name {
		color: var(--gray-600);
		font-weight: var(--bold);
	}
`;

const TopContainer = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
`;

const InfoContainer = styled.div`
	display: flex;
	align-self: flex-start;
	margin-top: 15px;
	// 사이 간격 조절
	& > div:nth-child(1) {
		margin-right: 5px;
	}
`;

const Review = styled.div`
	width: 100%;
	height: 100%;
	align-self: start;
	padding-top: 20px;
	color: var(--gray-400);
	font-size: 14px;
	line-height: 1.5;
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	color: var(--gray-300);

	span {
		width: 1px;
		height: 13px;
		background-color: var(--gray-300);
	}
`;

export default MyPageReviewList;
