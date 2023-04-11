import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import DefalutModal from './DefalutModal';
import ShoppingList from '../Lists/ShoppingList';
import UpdateTalkForm from '../Forms/UpdateTalkForm';
import { usePatch } from '../../hooks/useFetch';
import {
	WRITE_MORE_THAN_20_CHARACTERS,
	UPDATE_COMPLETE,
} from '../../assets/constants/Constants';
import { TalkModalProps } from '../../types/modal.type';

// 토크 수정 모달
function TalkModal({ setIsModalOpen, IsModalOpen, talk }: TalkModalProps) {
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
	const handleNewContent: React.ChangeEventHandler<HTMLTextAreaElement> =
		useCallback(
			(e) => {
				setTalkContent(e.target.value);
			},
			[talkContent],
		);

	// 토크/리토크 수정 요청 함수!
	const handleTalkUpdate: React.MouseEventHandler<HTMLButtonElement> =
		useCallback(() => {
			// 컨텐츠가 20자가 넘지 않는다면 에러메시지 노출
			if (talkContent.length < 20) {
				toast.error(WRITE_MORE_THAN_20_CHARACTERS);
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
			toast.success(UPDATE_COMPLETE);

			// 모달 닫기
			setIsModalOpen(false);
		}, [talkContent]);

	return (
		<DefalutModal
			title={data.title}
			list={
				<ShoppingList
					talk
					brand={talk?.item.brand}
					thumbnail={talk?.item.thumbnail}
					title={talk?.item.title}
					capacity={talk?.item.capacity}
					itemId={talk?.item.itemId}
					price={talk.item.discountPrice || talk.item.price}
					discountRate={talk.item.discountRate && talk.item.discountRate}
					beforePrice={
						talk.item.price !== talk.item.discountPrice &&
						talk.item.discountPrice
					}
				/>
			}
			form={
				<UpdateTalkForm
					content={talkContent}
					handleContent={handleNewContent}
					handleSubmit={handleTalkUpdate}
				/>
			}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
		/>
	);
}

export default TalkModal;
