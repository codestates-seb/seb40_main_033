import DefalutModal from './DefalutModal';
import { CancelModalProps } from '../../types/modal.type';

function CancelModal({
	setIsModalOpen,
	IsModalOpen,
	onClickLpbtn,
	target,
}: CancelModalProps) {
	const data = {
		title: `${target}${target === '장바구니' ? '에서 삭제' : ' 취소'}`,
		contents: `정말 ${target === '장바구니' ? '삭제' : '취소'}하시겠습니까?`,
		lpbtnTexts: '예',
		pbtnTexts: '아니오',
	};

	return (
		<DefalutModal
			title={data.title}
			contents={data.contents}
			lpbtnTexts={data.lpbtnTexts}
			pbtnTexts={data.pbtnTexts}
			setIsModalOpen={setIsModalOpen}
			IsModalOpen={IsModalOpen}
			onClickLpbtn={onClickLpbtn}
		/>
	);
}

export default CancelModal;
