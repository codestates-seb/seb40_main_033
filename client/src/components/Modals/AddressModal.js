import DefalutModal from './DefalutModal';

function AddressModal({ IsModalOpen, setIsModalOpen, children }) {
	return (
		<DefalutModal setIsModalOpen={setIsModalOpen} IsModalOpen={IsModalOpen}>
			{children}
		</DefalutModal>
	);
}

export default AddressModal;
