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

	// 토크 수정 hook
	const { mutate: talkUpdateMu } = usePatch(`/talks/${talk.talkId}`);

	// 리토크 수정 hook
	const { mutate: reTalkUpdateMu } = usePatch(
		`/talks/comments/${talk.talkCommentId}`,
	);

	// 토크/리토크 수정할 컨텐츠 상태
	const handleNewContent = useCallback(
		(e) => {
			setTalkContent(e.target.value);
		},
		[talkContent],
	);

	// 토크/리토크 수정 요청 함수!
	const handleTalkUpdate = useCallback(() => {
		// 컨텐츠가 20자가 넘지 않는다면 에러메시지 노출
		if (talkContent.length < 20) {
			toast.error('20자 이상 작성해주세요.');
			return;
		}

		// 리토크라면 리토크 수정 요청
		if (talk.reply) {
			reTalkUpdateMu({ content: talkContent });

			// 토크라면 토크 수정 요청
		} else {
			talkUpdateMu({ content: talkContent });
		}

		// 수정이 끝나면 완료메시지 노출
		toast.success('수정이 완료되었습니다!');

		// 모달 닫기
		setIsOpen(false);
	}, [talkContent]);

	return (
		<DefalutModal
			title={data.title}
			list={
				<PayLists
					talk
					brand={talk?.item.brand}
					thumbnail={talk?.item.thumbnail}
					title={talk?.item.title}
					capacity={talk?.item.capacity}
					itemId={talk?.item.itemId}
					price={talk.item.disCountPrice || talk.item.price}
					discountRate={
						talk.item.discountRate === 0 ? '' : talk.item.discountRate
					}
					beforePrice={talk.item.disCountPrice ? talk.item.price : null}
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
