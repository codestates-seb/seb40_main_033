// 마이페이지의 talk 수정 form
import DefalutForm from './DefalutForm';
import { PurpleButton } from '../Buttons/PurpleButton';

function UpdateTalkForm() {
	return (
		<DefalutForm
			placeholder="보고 있는 상품에 대한 글을 남겨주세요."
			maxLength={150}
			height={130}
			target="토크"
			purpleButton={
				<PurpleButton width="84px" height="35px" fontSize="13px">
					작성완료
				</PurpleButton>
			}
		/>
	);
}

export default UpdateTalkForm;
