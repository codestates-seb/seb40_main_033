import styled from 'styled-components';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { useCallback, useState } from 'react';
import { LetterButtonColor, LetterButton } from '../Buttons/LetterButton';
import { DotDate } from '../Etc/ListDate';
import TalkForm from '../Forms/TalkForm';
import DeleteNotesModal from '../Modals/DeleteNotesModal';

function DetailTalkList({
	isReply,
	itemId,
	createdAt,
	content,
	userId,
	shopper,
	talkComments,
}) {
	const [writable, setWritable] = useState(false);
	const [writeReply, setWriteReply] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const handleFormOpen = useCallback(
		(e) => {
			if (e.target.innerText === '수정') {
				setWritable(!writable);
			} else {
				setWriteReply(!writeReply);
			}
		},
		[writable],
	);

	const handleDeleteClick = useCallback(() => {
		setOpenDeleteModal(true);
	}, []);

	// talk 삭제 요청!
	const handleDeleteTalk = useCallback(() => {
		console.log('삭제 요청');
		setOpenDeleteModal(false);
	}, []);

	return (
		<TalkContainer>
			{isReply && <MdSubdirectoryArrowRight />}
			<Box>
				<TopContainer>
					<Name className={shopper && 'shopper'}>
						{shopper ? '구매자' : '비구매자'}
					</Name>
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
				{writable ? <TalkForm /> : <Talk>{content}</Talk>}
				<InfoContainer className={isReply && 'reply'}>
					{!isReply && !writable && (
						<LetterButton onClick={handleFormOpen}>답변 작성</LetterButton>
					)}
					<DotDate date={createdAt} />
				</InfoContainer>
				{writeReply && (
					<TalkForm placeholder="토크에 대한 답글을 남겨주세요." />
				)}
			</Box>
			<DeleteNotesModal
				openDeleteModal={openDeleteModal}
				setOpenDeleteModal={setOpenDeleteModal}
				handleDelete={handleDeleteTalk}
			/>
		</TalkContainer>
	);
}

const Box = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const TalkContainer = styled.li`
	display: flex;
	background-color: white;
	width: 100%;
	padding: 34px 10px 26px 10px;
	border-bottom: 1px solid #f1f1f1;

	svg {
		margin-right: 10px;
		margin-bottom: 10px;
		font-size: 18px;
		font-weight: var(--extraBold);
		* {
			color: var(--purple-200);
		}
	}
`;

const TopContainer = styled.div`
	/* border-bottom: 1px solid rgb(235, 235, 235); */
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const Name = styled.div`
	font-size: 16px;
	font-weight: var(--bold);

	&.shopper {
		color: var(--purple-300);
	}
`;

const InfoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-top: 30px;

	button {
		padding: 0;
	}

	&.reply {
		justify-content: flex-end;
		margin-top: 20px;
	}
`;

const Talk = styled.div`
	/* border: 1px solid black; */

	/* height: 100px; */
	/* text-align: left; */
	align-self: start;
	padding-top: 20px;
	color: var(--gray-400);
	font-size: 14px;
	line-height: 1.5;
	width: 100%;
	height: 100%;
	/* margin-bottom: 20px; */
`;

const ButtonContainer = styled.div`
	/* width: 80px;
	height: 20px; */
	/* position: relative; */
	/* left: 580px;
	bottom: 80px; */
	display: flex;
	align-items: center;
	color: var(--gray-300);

	span {
		width: 1px;
		height: 13px;
		background-color: var(--gray-300);
	}
`;

export default DetailTalkList;
