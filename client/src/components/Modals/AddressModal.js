import Modal from 'react-modal';
import './style.css';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(172, 174, 187, 0.2)',
	},
	content: {
		animation: 'modalFadeIn 0.4s ease-in-out',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		transform: 'translate(-50%, -50%)',
		border: 'none',
		borderRadius: '10px',
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.07)',
	},
};

// 모달에게 숨겨질 부분
Modal.setAppElement('#root');

function AddressModal({ children, modalIsOpen, setIsOpen }) {
	// 모달 열었을 때 작동하는 함수 (필요 시 사용)
	// const afterOpenModal = () => {
	// 	// 예시: subtitle.style.color = 'red';
	// 	Modal.style.transform = 'scale(1) rotateX(0deg)';
	// 	// transform: scale(1) rotateX(0deg);
	// 	Modal.style.transition = 'all 150ms ease-in';
	// };

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<Modal
			isOpen={modalIsOpen}
			// onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			portalClassName="modal"
		>
			{children}
		</Modal>
	);
}

export default AddressModal;
