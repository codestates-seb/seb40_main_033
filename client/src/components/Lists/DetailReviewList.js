import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { LetterButtonColor } from '../Buttons/LetterButton';
import { DotDate } from '../Etc/ListDate';
import { LongTextStar } from '../Stars/TextStar';
import OrderDetailList from './MyPageLists/OrderDetailList';
import ReviewModal from '../Modals/ReviewModal';
import DeleteNotesModal from '../Modals/DeleteNotesModal';

function DetailReviewList({
	itemId,
	star,
	displayName,
	createdAt,
	content,
	review,
	userId,
}) {
	const [openForm, setOpenForm] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const user = localStorage.getItem('userId');
	const [isAuthor] = useState(Number(user) === userId);

	const handleFormOpen = () => {
		setOpenForm(!openForm);
	};

	const handleDeleteClick = useCallback(() => {
		setOpenDeleteModal(true);
	}, []);

	// review 삭제 요청!
	const handleDeleteTalk = useCallback(() => {
		setOpenDeleteModal(false);
	}, []);

	return (
		<Box>
			<TopContainer>
				<Name>{displayName}</Name>
				{isAuthor && (
					<ButtonContainer>
						<LetterButtonColor onClick={handleFormOpen} fontSize="12px">
							수정
						</LetterButtonColor>
						<span />
						<LetterButtonColor onClick={handleDeleteClick} fontSize="12px">
							삭제
						</LetterButtonColor>
					</ButtonContainer>
				)}
			</TopContainer>
			<InfoContainer>
				<LongTextStar noText star={star} />
				<DotDate date={createdAt} />
			</InfoContainer>
			<Review>{content}</Review>
			<ReviewModal
				setIsOpen={setOpenForm}
				modalIsOpen={openForm}
				OrderDetailList={OrderDetailList}
				review={review}
			/>
			<DeleteNotesModal
				openDeleteModal={openDeleteModal}
				setOpenDeleteModal={setOpenDeleteModal}
				handleDelete={handleDeleteTalk}
			/>
		</Box>
	);
}

const Box = styled.li`
	background-color: white;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 34px 10px;
	border-bottom: 1px solid #f1f1f1;
`;

const TopContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const Name = styled.div`
	font-size: 16px;
	font-weight: var(--bold);
	margin-bottom: 14px;
`;

const InfoContainer = styled.div`
	display: flex;
	align-self: flex-start;
	& > div {
		margin-right: 10px;
	}
`;

const Review = styled.div`
	width: 100%;
	height: 100%;
	align-self: start;
	padding: 20px 0;
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

export default DetailReviewList;
