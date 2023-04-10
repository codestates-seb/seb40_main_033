import DefalutModal from './DefalutModal';

function AddressModal({ modalIsOpen, setIsOpen, children }) {
	return (
		<DefalutModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen}>
			{children}
		</DefalutModal>
	);
}

export default AddressModal;
