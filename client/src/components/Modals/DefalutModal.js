import { useCallback } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TempLogo } from '../../assets/Icons';
import { PurpleButton, LightPurpleButton } from '../Buttons/PurpleButton';
import './style.css';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(172, 174, 187, 0.2)',
	},
	content: {
		animation: 'modalFadeIn 0.3s ease-in-out',
		minWidth: '500px',
		heigth: '384px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		transform: 'translate(-50%, -50%)',
		background: '#ffffff',
		padding: '60px 75px',
		border: 'none',
		borderRadius: '10px',
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
	},
};

// 모달에게 숨겨질 부분
Modal.setAppElement('#root');

function DefalutModal({
	title,
	list,
	form,
	star,
	contents,
	subContents,
	lpbtnTexts,
	pbtnTexts,
	modalIsOpen,
	setIsOpen,
	path, // 모달 닫았을 때 이동할 경로
	onClickPbtn, // 버튼에 넣고 싶은 onClick 함수
	onClickLpbtn,
	autoClose,
}) {
	const navigate = useNavigate();

	const closeModal = useCallback(() => {
		setIsOpen(false);
		if (path) {
			navigate(path);
		}
	}, []);

	// 모달 열었을 때 작동하는 함수 (필요 시 사용)
	const afterOpenModal = () => {
		if (autoClose) {
			setTimeout(() => {
				closeModal();
			}, 1800);
		}
	};

	return (
		<Modal
			isOpen={modalIsOpen}
			closeTimeoutMS={500}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			portalClassName="modal"
		>
			<Icon>
				<TempLogo />
			</Icon>
			<Title>{title}</Title>
			<FormContainer>
				{list}
				{star}
				{form}
			</FormContainer>
			{contents ? <Contents>{contents}</Contents> : null}
			{subContents ? <SubContents>{subContents}</SubContents> : null}
			{lpbtnTexts || pbtnTexts ? (
				<BtnContainer>
					{lpbtnTexts ? (
						<LightPurpleButton
							fontSize="13px"
							onClick={onClickLpbtn || closeModal}
						>
							{lpbtnTexts}
						</LightPurpleButton>
					) : null}
					{pbtnTexts ? (
						<PurpleButton fontSize="13px" onClick={onClickPbtn || closeModal}>
							{pbtnTexts}
						</PurpleButton>
					) : null}
				</BtnContainer>
			) : null}
		</Modal>
	);
}

// 리뷰/톡 관련 리스트, 별점, 폼 컨테이너
const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.h1`
	width: 285px;
	text-align: center;
	font-size: 22px;
	color: var(--purple-200);
	padding-bottom: 10px;
	border-bottom: 0.5px solid var(--purple-200);
	font-weight: var(--bold);
	margin-bottom: 38px;
`;

const Contents = styled.pre`
	text-align: center;
	line-height: 1.6;
`;

const SubContents = styled.p`
	text-align: center;
	line-height: 1.5;
	margin: 30px 0 5px 0;
`;

const Icon = styled.div`
	svg {
		width: 31px;
		height: 14px;
	}
	margin-bottom: 12px;
`;

const BtnContainer = styled.div`
	display: flex;
	margin-top: 50px;
	button {
		margin: 0 5px;
	}
`;

export default DefalutModal;
