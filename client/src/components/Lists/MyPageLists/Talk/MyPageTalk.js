import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LetterButtonColor } from '../../../Buttons/LetterButton';
import { DotDate } from '../../../Etc/ListDate';
import OrderDetailList from '../OrderDetailList';
import DeleteNotesModal from '../../../Modals/DeleteNotesModal';
import TalkModal from '../../../Modals/TalkModal';
import { useDelete } from '../../../../hooks/useFetch';

function MyPageTalk({ talk, isReply }) {
	const [openForm, setOpenForm] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const navigate = useNavigate();
	// 토크 삭제
	const { mutate: talkDeleteMu, response: talkDeleteRes } = useDelete(
		`/talks/${talk.talkId}`,
	);

	// 리토크 삭제
	const { mutate: reTalkDeleteMu, response: reTalkDeleteRes } = useDelete(
		`/talks/comments/${talk.talkCommentId}`,
	);

	const handleFormOpen = useCallback(
		(e) => {
			setOpenForm(true);
		},
		[openForm],
	);

	const handleItemClick = () => {
		navigate(`/detail/${talk.item.itemId}`);
	};

	// 삭제 모달 열기
	const handleDeleteClick = useCallback(() => {
		setOpenDeleteModal(true);
	}, []);

	// 토크 삭제 요청
	const handleDeleteTalk = useCallback(() => {
		// 리토크
		if (isReply) {
			reTalkDeleteMu();
		} else {
			talkDeleteMu();
		}
		setOpenDeleteModal(false);
		toast.success('삭제가 완료되었습니다!');
	}, []);

	return (
		<Box>
			<Image
				src={talk.item.thumbnail}
				alt="상품 이미지"
				onClick={handleItemClick}
			/>
			<ListContainer>
				<TopContainer>
					<NameContainer>
						<Info className="brand">{talk.item.brand}</Info>
						<Info className="name" onClick={handleItemClick}>
							{talk.item.title}
						</Info>
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
					<Content>{talk.content}</Content>
					<DotDate date={talk.createdAt} />
				</BottomContainer>
				<TalkModal
					setIsOpen={setOpenForm}
					modalIsOpen={openForm}
					OrderDetailList={OrderDetailList}
					talk={talk}
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
	cursor: pointer;
`;

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 100%;
	margin-left: 30px;
	position: relative;

	time {
		position: absolute;
		right: 5px;
		bottom: -55px;
	}
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
		cursor: pointer;
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
