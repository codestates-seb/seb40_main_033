// 상세페이지의 talk 작성 form
import DefalutForm from './DefalutForm';
import { LetterButton } from '../Buttons/LetterButton';

function TalkForm() {
	return (
		<DefalutForm
			placeholder="보고 있는 상품에 대한 글을 남겨주세요."
			maxLength={150}
			height={130}
			target="토크"
			letterButton={<LetterButton fontSize="13px">작성완료</LetterButton>}
		/>
	);
}

export default TalkForm;
