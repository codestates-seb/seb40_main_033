import DefalutModal from './DefalutModal';
import { AddressModalProps } from '../../types/modal.type';

function AddressModal({
	IsModalOpen,
	setIsModalOpen,
	children,
}: AddressModalProps) {
	return (
		<DefalutModal setIsModalOpen={setIsModalOpen} IsModalOpen={IsModalOpen}>
			{children}
		</DefalutModal>
	);
}

export default AddressModal;
