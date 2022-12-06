import styled from 'styled-components';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { HiBadgeCheck } from 'react-icons/hi';
import { LetterButtonColor, LetterButton } from '../Buttons/LetterButton';
import { DotDate } from '../Etc/ListDate';
import TalkForm from '../Forms/TalkForm';
import DeleteNotesModal from '../Modals/DeleteNotesModal';
import { usePost, usePatch, useDelete } from '../../hooks/useFetch';

function DetailTalkList({
	isReply,
	itemId,
	createdAt,
	reTalkContent,
	content,
	talkId,
	userId,
	talkCommentId,
	displayName,
	shopper,
}) {
	const [writable, setWritable] = useState(false);
	const [writeReply, setWriteReply] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [newContent, setNewContent] = useState(content || reTalkContent); // 업데이트할 토크 컨텐츠
	const [reContent, setReContent] = useState(''); // 새로 작성한 리토크
	const { loginStatus } = useSelector((store) => store.user);
	const user = localStorage.getItem('userId');
	const [isAuthor] = useState(Number(user) === userId);

	// 토크 수정
	const { mutate: talkUpdateMu } = usePatch(`/talks/${talkId}`);

	// 토크 삭제
	const { mutate: talkDeleteMu } = useDelete(`/talks/${talkId}`);

	// 리토크 삭제
	const { mutate: reTalkDeleteMu } = useDelete(
		`/talks/comments/${talkCommentId}`,
	);

	// 리토크 작성
	const { mutate: reTalkCreateMu } = usePost(
		`/talks/comments/${talkId}?itemId=${itemId}`,
	);

	// 리토크 수정
	const { mutate: reTalkUpdateMu } = usePatch(
		`/talks/comments/${talkCommentId}`,
	);

	// 토크 수정 컨텐츠 상태
	const handleNewContent = useCallback(
		(e) => {
			setNewContent(e.target.value);
		},
		[newContent],
	);

	// 리톡 작성 컨텐츠 상태
	const handleReContent = useCallback(
		(e) => {
			setReContent(e.target.value);
		},
		[reContent],
	);

	// 리토크 작성! (답글)
	const handleReTalkCreate = useCallback(() => {
		if (reContent.length < 20) {
			toast.error('20자 이상 작성해주세요.');
			return;
		}
		reTalkCreateMu({ content: reContent });

		setWriteReply(false);
	}, [reContent]);

	// 토크 수정!
	const handleTalkUpdate = useCallback(() => {
		if (newContent.length < 20) {
			toast.error('20자 이상 작성해주세요.');
			return;
		}

		// 리토크
		if (isReply) {
			reTalkUpdateMu({ content: newContent });
		} else {
			talkUpdateMu({ content: newContent });
		}
		setWritable(false);
	}, [newContent]);

	const handleFormOpen = useCallback(
		(e) => {
			if (!loginStatus) {
				toast.error('로그인이 필요한 서비스입니다.');
				return;
			}
			if (e.target.innerText === '수정') {
				setWritable(!writable); // 수정을 눌렀을 때
			} else {
				setWriteReply(!writeReply); // 답변작성을 눌렀을 때
			}
		},
		[writable, writeReply],
	);

	const handleDeleteClick = useCallback(() => {
		setOpenDeleteModal(true);
	}, []);

	const handleDeleteTalk = useCallback(() => {
		// 리토크
		if (isReply) {
			reTalkDeleteMu();
		} else {
			talkDeleteMu();
		}
		setOpenDeleteModal(false);
	}, []);

	return (
		<TalkContainer>
			{isReply && <MdSubdirectoryArrowRight />}
			<Box>
				<TopContainer>
					<User>
						<Name>{displayName} </Name>
						{shopper && (
							<>
								<HiBadgeCheck />
								<span>이 상품을 구매하셨어요!</span>
							</>
						)}
					</User>
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
				{writable ? (
					<TalkForm
						content={newContent}
						handleContent={handleNewContent}
						handleSubmit={handleTalkUpdate}
					/>
				) : (
					<Talk>{newContent}</Talk>
				)}
				<InfoContainer className={isReply && 'reply'}>
					{!isReply && !writable && (
						<LetterButton onClick={handleFormOpen}>답변 작성</LetterButton>
					)}
					<DotDate date={createdAt} />
				</InfoContainer>
				{writeReply && (
					<TalkForm
						content={reContent}
						handleContent={handleReContent}
						handleSubmit={handleReTalkCreate}
						placeholder="토크에 대한 답글을 남겨주세요."
					/>
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
	padding: 34px 10px 30px 10px;
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
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const User = styled.div`
	display: flex;
	align-items: center;

	& > svg {
		margin: 0 2px 0 5px;
		font-size: 16px;
	}

	span {
		font-size: 9px;
		color: var(--purple-300);
	}
`;

const Name = styled.div`
	font-size: 16px;
	font-weight: var(--bold);
	margin-top: 1px;
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
	align-self: start;
	padding-top: 20px;
	color: var(--gray-400);
	font-size: 14px;
	line-height: 1.5;
	width: 100%;
	height: 100%;
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

export default DetailTalkList;
