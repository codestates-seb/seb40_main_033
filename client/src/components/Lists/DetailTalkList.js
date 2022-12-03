import styled from 'styled-components';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LetterButtonColor, LetterButton } from '../Buttons/LetterButton';
import { DotDate } from '../Etc/ListDate';
import TalkForm from '../Forms/TalkForm';
import DeleteNotesModal from '../Modals/DeleteNotesModal';
import { usePost, usePatch, useDelete } from '../../hooks/useFetch';

function DetailTalkList({
	isReply,
	itemId,
	createdAt,
	content,
	talkId,
	userId,
	displayName,
	shopper,
	talkComments,
}) {
	const [writable, setWritable] = useState(false);
	const [writeReply, setWriteReply] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [newContent, setNewContent] = useState(content); // 업데이트할 토크 컨텐츠
	const [reContent, setReContent] = useState(''); // 새로 작성한 리토크
	const [NewReContent, setNewReContent] = useState(talkComments && content); // 업데이트할 리토크
	const { loginStatus } = useSelector((store) => store.user);
	// 토크 수정
	const { mutate: talkUpdateMu, response: talkUpdateRes } = usePatch(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/talks/${talkId}`,
	);

	// 토크 삭제
	const { mutate: talkDeleteMu, response: talkDeleteRes } = useDelete(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/talks/${talkId}`,
	);

	// 리토크 삭제
	const { mutate: reTalkDeleteMu, response: reTalkDeleteRes } = useDelete(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/talks/comments/{talkcomment-id}`,
	);

	// // 리토크 작성
	const { mutate: reTalkCreateMu, response: reTalkCreateRes } = usePost(
		`	http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/talks/comments/${talkId}?itemId=${itemId}`,
	);

	// // 리토크 수정
	// const { mutate: reTalkUpdateMu, response: reTalkUpdateRes } = usePatch(
	// 	`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/talks/comments/{talkcomment-id}`,
	// );

	console.log('토크의 토크', talkComments);

	// 리토크 작성!
	const handleReTalkCreate = useCallback(
		(e) => {
			// e.preventDefault();
			console.log('제출', reContent);
			// 마이페이지- 주문내역상세페이지 리뷰 작성 요청
			if (reContent.length < 20) {
				toast.error('20자 이상 작성해주세요.');
				return;
			}
			reTalkCreateMu({ content: reContent });
			console.log('response', reTalkCreateRes);
		},
		[reContent],
	);

	// 토크 수정!
	const handleTalkUpdate = useCallback(
		(e) => {
			// e.preventDefault();
			console.log('제출', newContent);
			// 마이페이지- 주문내역상세페이지 리뷰 작성 요청
			if (newContent.length < 20) {
				toast.error('20자 이상 작성해주세요.');
				return;
			}

			talkUpdateMu({ content: newContent });
			console.log('response', talkUpdateRes);
		},
		[newContent],
	);

	// 토크 수정 컨텐츠 상태
	const handleNewContent = useCallback(
		(e) => {
			setNewContent(e.target.value);
			console.log('내용:', e.target.value);
		},
		[newContent],
	);

	// 리톡 컨텐츠 상태 변경
	const handleReContent = useCallback(
		(e) => {
			setReContent(e.target.value);
			console.log('내용:', e.target.value);
		},
		[newContent],
	);

	const handleFormOpen = useCallback(
		(e) => {
			if (!loginStatus) {
				toast.error('로그인이 필요한 서비스입니다.');
				return;
			}
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

	// talk 삭제 요청! ===> 이거 target이 뭐냐에 따라 좀 달라야할듯
	const handleDeleteTalk = useCallback(() => {
		// 리토크
		if (isReply) {
			console.log('이건 리토크');
		} else {
			talkDeleteMu();
		}
		// console.log('삭제 요청');
		// talkDeleteMu();
		setOpenDeleteModal(false);
	}, []);

	return (
		<TalkContainer>
			{isReply && <MdSubdirectoryArrowRight />}
			<Box>
				<TopContainer>
					<Name className={shopper && 'shopper'}>
						{displayName || (shopper ? '구매자' : '비구매자')}
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
