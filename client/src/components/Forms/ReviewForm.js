// 마이페이지의 리뷰 수정/작성 form
import DefalutForm from './DefalutForm';

function ReviewForm({ content, handleContent, handleSubmit }) {
	return (
		<DefalutForm
			placeholder="받아보신 상품에 대한 리뷰를 남겨주세요."
			maxLength={350}
			height={210}
			target="리뷰"
			content={content}
			handleContent={handleContent}
			handleSubmit={handleSubmit}
		/>
	);
}

export default ReviewForm;
