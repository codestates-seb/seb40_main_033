// 상세페이지의 talk 작성 form
import DefalutForm from './DefalutForm';
import { BasicFormProps } from '../../types/form.type';

interface TalkFormProps extends BasicFormProps {
	placeholder: string;
}
function TalkForm({
	placeholder,
	content,
	handleContent,
	handleSubmit,
}: TalkFormProps) {
	return (
		<DefalutForm
			placeholder={placeholder || '보고 있는 상품에 대한 글을 남겨주세요.'}
			maxLength={150}
			height={130}
			target="토크"
			content={content}
			handleContent={handleContent}
			handleSubmit={handleSubmit}
		/>
	);
}

export default TalkForm;
