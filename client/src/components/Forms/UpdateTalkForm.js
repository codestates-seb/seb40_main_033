// 마이페이지의 talk 수정 form
import DefalutForm from './DefalutForm';

function UpdateTalkForm({ content, handleContent, handleSubmit }) {
	return (
		<DefalutForm
			placeholder="보고 있는 상품에 대한 글을 남겨주세요."
			maxLength={150}
			height={130}
			target="토크"
			content={content}
			handleContent={handleContent}
			handleSubmit={handleSubmit}
		/>
	);
}

export default UpdateTalkForm;
