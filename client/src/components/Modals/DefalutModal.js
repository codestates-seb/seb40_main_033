import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { TempLogo } from '../../assets/Icons';
import { PurpleButton, LightPurpleButton } from '../Buttons/PurpleButton';

const StyledModal = styled(ReactModalAdapter)`
	@keyframes modalFadeIn {
		from {
			transform: translate(-50%, -60%);
			opacity: 0;
		}
		to {
			transform: translate(-50%, -50%);
			opacity: 1;
		}
	}

	@keyframes modalFadeOut {
		from {
			transform: translate(-50%, -50%);
			opacity: 0.8;
		}
		to {
			transform: translate(-50%, -60%);
			opacity: 0;
		}
	}

	&__content {
		min-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		top: 50%;
		left: 50%;
		right: auto;
		bottom: auto;
		position: fixed;
		transform: translate(-50%, -50%);
		background: #ffffff;
		padding: 60px 75px;
		border: none;
		border-radius: 10px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

		${({ isDelay }) =>
			!isDelay // 딜레이가 아님 === 열림
				? css`
						animation: modalFadeIn 0.3s ease;
				  `
				: css`
						animation: modalFadeOut 0.35s ease;
				  `};
	}

	&__overlay {
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background-color: rgba(172, 174, 187, 0.2);
	}
`;

function ReactModalAdapter({ className, ...props }) {
	const contentClassName = `${className}__content`;
	const overlayClassName = `${className}__overlay`;
	return (
		<Modal
			portalClassName="modal"
			className={contentClassName}
			overlayClassName={overlayClassName}
			{...props}
		/>
	);
}

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
	children,
}) {
	const navigate = useNavigate();
	const [isDelay, setIsDelay] = useState(false);

	const closeModal = () => {
		setIsDelay(true);

		setTimeout(() => {
			setIsOpen(false);
			setIsDelay(false);
		}, 300);

		if (path) {
			navigate(path);
		}
	};

	// 모달 열었을 때 작동하는 함수 (필요 시 사용)
	const afterOpenModal = () => {
		if (autoClose) {
			setTimeout(() => {
				closeModal();
			}, 1800);
		}
	};

	return (
		<StyledModal
			isOpen={modalIsOpen}
			isDelay={isDelay}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
		>
			{children || (
				<>
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
								<PurpleButton
									fontSize="13px"
									onClick={onClickPbtn || closeModal}
								>
									{pbtnTexts}
								</PurpleButton>
							) : null}
						</BtnContainer>
					) : null}
				</>
			)}
		</StyledModal>
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
