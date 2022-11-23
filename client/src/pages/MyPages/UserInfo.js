// 회원정보
import styled from 'styled-components';
import {
	LetterButton,
	LetterButtonColor,
} from '../../components/Buttons/LetterButton';
// 감싸고 flex, colunm만 주기. 회원탈퇴 버튼에 margin-top: 23px 줄 것 왜냐면 그래야지 화면이 커져도 둘이 붙어있응께
function UserInfo() {
	const onClick = () => {
		console.log('정보수정 버튼 클릭.. 근데 실제로는 api 요청 드가야 함');
	};

	return (
		<>
			<Box>
				<InputBox />
				<InputBox />
				<LetterButton onClick={onClick}>정보 수정</LetterButton>
			</Box>
			<LetterButtonColor
				onClick={onClick}
				color="red"
				colorCode="100"
				fontSize="11px"
			>
				회원탈퇴
			</LetterButtonColor>
		</>
	);
}

const Box = styled.div`
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

const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid black; // 구분을 위한 임시 설정입니다.
	width: 397px;
	height: 205px;
`;
export default UserInfo;
