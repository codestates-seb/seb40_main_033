import { useCallback, useState } from 'react';
import DefalutModal from './DefalutModal';
import PayLists from '../Lists/PayLists';
import UpdateTalkForm from '../Forms/UpdateTalkForm';
import { usePatch } from '../../hooks/useFetch';

// 토크 수정 모달
function TalkModal({ setIsOpen, modalIsOpen, talk }) {
	const data = {
		title: 'Talk',
	};

	const [content, setContent] = useState(talk?.content);

	const { mutate, isLoading, isError, error, response } = usePatch(
		talk.reply
			? `http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/reviews/comments/${talk?.talkCommentId}`
			: `http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/reviews/talks/${talk?.talkId}`,
		// 'http://localhost:3001/reviews',
	);

	const handleContent = useCallback((e) => {
		setContent(e.target.value);
	}, []);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		mutate({ content });
		setIsOpen(false);
	}, []);

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
					content={content}
					handleContent={handleContent}
					handleSubmit={handleSubmit}
				/>
			}
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
		/>
	);
}

export default TalkModal;
