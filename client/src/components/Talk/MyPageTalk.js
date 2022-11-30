import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { LetterButtonColor } from '../Buttons/LetterButton';
import { DotDate } from '../Etc/ListDate';
import OrderDetailList from '../Lists/MyPageLists/OrderDetailList';
import ReviewModal from '../Modals/ReviewModal';
import DeleteNotesModal from '../Modals/DeleteNotesModal';

function MyPageTalk({ content, isReply }) {
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
			<Image
				src="https://wiselycompany.cafe24.com/web/product/medium/202211/46763d93d5fd373356268c62b05f5560.jpg"
				alt="상품 이미지"
			/>
			<ListContainer>
				<TopContainer>
					<NameContainer>
						<Info className="brand"> California Gold Nutrition</Info>
						<Info className="name">오메가3 프리미엄 피쉬 오일</Info>
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
				<BottomContainer>
					{isReply && <MdSubdirectoryArrowRight />}
					<Content>{content}</Content>
				</BottomContainer>
				<DotDate date="2022/11/23T11:33:33" />
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
	width: 160px;
	height: 160px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 100%;
	height: 160px; // 임시
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

const BottomContainer = styled.div`
	display: flex;
	align-self: flex-start;
	margin-top: 15px;
	flex-grow: 1;
	// 사이 간격 조절
	svg {
		margin-right: 10px;
		margin-bottom: 10px;
		font-size: 18px;
		* {
			color: var(--purple-200);
		}
	}
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
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

export default MyPageTalk;
