import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { LetterButtonColor } from '../Buttons/LetterButton';
import ListDate from '../Etc/ListDate';
import { LongTextStar } from '../Stars/TextStar';
import OrderDetailList from './MyPageLists/OrderDetailList';
import ReviewModal from '../Modals/ReviewModal';
import DeleteNotesModal from '../Modals/DeleteNotesModal';

function DetailReviewList({ content }) {
	const [openForm, setOpenForm] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const handleFormOpen = () => {
		setOpenForm(!openForm);
	};

	const handleDeleteClick = useCallback(() => {
		setOpenDeleteModal(true);
	}, []);

	// review 삭제 요청!
	const handleDeleteTalk = useCallback(() => {
		console.log('삭제 요청');
		setOpenDeleteModal(false);
	}, []);

	return (
		<Box>
			<TopContainer>
				<Name>코알라</Name>
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
				<LongTextStar noText />
				<ListDate date="2022/11/23T11:33:33" />
			</InfoContainer>
			<Review>{content}</Review>
			<ReviewModal
				setIsOpen={setOpenForm}
				modalIsOpen={openForm}
				OrderDetailList={OrderDetailList}
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
