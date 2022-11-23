// 회원정보
import { useState } from 'react';
import styled from 'styled-components';
import {
	LetterButton,
	LetterButtonColor,
} from '../../components/Buttons/LetterButton';
import DeleteAccountModal from '../../components/Modals/DeleteAccountModal';

// 감싸고 flex, colunm만 주기. 회원탈퇴 버튼에 margin-top: 23px 줄 것 왜냐면 그래야지 화면이 커져도 둘이 붙어있응께
export default function UserInfo() {
	const onInfoClick = () => {
		console.log('정보수정버튼 클릭.. 근데 실제로는 api 요청 드가야 함');
	};

	const onWithdrawClick = () => {
		console.log('회원탈퇴버튼 클릭.. 근데 실제로는 api 요청 드가야 함');
	};

	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};
	return (
		<MainContainer>
			<Box>
				<InfoBox>
					<InfoHeading>기본 정보</InfoHeading>
					<Information first="닉네임" second="이메일" third="비밀번호" />
				</InfoBox>
				<InfoBox>
					<InfoHeading>배송지 정보</InfoHeading>
					<Information first="이름" second="전화번호" third="주소" />
				</InfoBox>
				<LetterButton onClick={onInfoClick}>정보 수정</LetterButton>
			</Box>
			<LetterButtonColor
				onClick={openModal}
				color="red"
				colorCode="100"
				fontSize="11px"
			>
				회원탈퇴
			</LetterButtonColor>
			<DeleteAccountModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} />
		</MainContainer>
	);
}

function Information({ first, second, third }) {
	return (
		<InputBox>
			<UserInfoBox>
				<InputLabel> {first} </InputLabel>
				<InfoInput type="text" />
			</UserInfoBox>
			<UserInfoBox className="middle">
				<InputLabel> {second} </InputLabel>
				<InfoInput type="text" />
			</UserInfoBox>
			<UserInfoBox>
				<InputLabel> {third} </InputLabel>
				<InfoInput type="text" />
			</UserInfoBox>
		</InputBox>
	);
}

const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Box = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #f1f1f1;
	background-color: white;
	width: 864px;
	height: 674px;
	padding: 66px 78px 23px 78px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	border-radius: 10px;

	button {
		align-self: flex-end; // 이 설정 기억해둘 것 엥 얘는 왜 끝에있지 하고 아무거나 건들면 안됨..
		font-weight: var(--regular);
	}

	& + button {
		margin-top: 22px;
		font-weight: var(--regular);
	}
`;

const InfoBox = styled.section`
	display: flex;
	border: 1px solid black; // 구분을 위한 임시 설정입니다.
	width: 397px;
	height: 205px;
	display: flex;
	flex-direction: column;
`;

const InfoHeading = styled.h2`
	font-size: 20px;
	color: var(--gray-500);
`;

const InputBox = styled.div`
	margin-left: 22px;
	margin-top: 46px;
	border: 1px solid green;
`;
const UserInfoBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 370px;

	&.middle {
		margin: 31px 0;
	}
`;
const InputLabel = styled.label`
	color: var(--gray-400);
`;

const InfoInput = styled.input`
	width: 296px;
	border: 0;
	border-bottom: 1px solid var(--gray-400);
	outline: none;
	font-size: 13px;
	word-break: break-all;

	:focus {
		border-bottom: 1px solid var(--purple-300);
	}
	&[type='password'] {
		font-family: 'Courier New', Courier, monospace;
	}
`;
