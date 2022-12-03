import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import DefalutModal from './DefalutModal';
import PayLists from '../Lists/PayLists';
import UpdateTalkForm from '../Forms/UpdateTalkForm';
import { usePatch } from '../../hooks/useFetch';

// 토크 수정 모달
function TalkModal({ setIsOpen, modalIsOpen, talk }) {
	const data = {
		title: 'Talk',
	};
	const [talkContent, setTalkContent] = useState(talk.content);

	// 토크 수정
	const { mutate: talkUpdateMu, response: talkUpdateRes } = usePatch(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/talks/${talk.talkId}`,
	);

	// 리토크 수정
	const { mutate: reTalkUpdateMu, response: reTalkUpdateRes } = usePatch(
		`http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/talks/comments/${talk.talkCommentId}`,
	);

	// 토크 수정 컨텐츠 상태
	const handleNewContent = useCallback(
		(e) => {
			setTalkContent(e.target.value);
			console.log('내용:', e.target.value);
		},
		[talkContent],
	);

	// 토크 수정!
	const handleTalkUpdate = useCallback(
		(e) => {
			if (talkContent.length < 20) {
				toast.error('20자 이상 작성해주세요.');
				return;
			}

			// 리토크
			if (talk.reply) {
				reTalkUpdateMu({ content: talkContent });
			} else {
				talkUpdateMu({ content: talkContent });
			}
			toast.success('수정이 완료되었습니다!');
			setIsOpen(false);
		},
		[talkContent],
	);

	return (
		<DefalutModal
			title={data.title}
			list={
				<PayLists
					talk
					brand={talk?.item.brand}
					thumbnail={talk?.item.thumbnail}
					title={talk?.item.title}
					price={talk?.item.price}
					capacity={talk?.item.capacity}
				/>
			}
			form={
				<UpdateTalkForm
					content={talkContent}
					handleContent={handleNewContent}
					handleSubmit={handleTalkUpdate}
				/>
			}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
		/>
	);
}

export default TalkModal;
