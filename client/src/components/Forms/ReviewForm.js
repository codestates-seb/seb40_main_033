// 마이페이지의 리뷰 수정/작성 form
import DefalutForm from './DefalutForm';
import { PurpleButton } from '../Buttons/PurpleButton';

function ReviewForm() {
	return (
		<DefalutForm
			placeholder="받아보신 상품에 대한 리뷰를 남겨주세요."
			maxLength={350}
			height={210}
			target="리뷰"
			purpleButton={
				<PurpleButton width="84px" height="35px" fontSize="13px">
					작성완료
				</PurpleButton>
			}
		/>
	);
}

export default ReviewForm;
