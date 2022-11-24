import styled from 'styled-components';
import AuthTitle from '../components/Etc/AuthTitle';
import { AuthForm } from '../components/Inputs/AuthForm';

// 회원가입 페이지
function SignUp() {
	return (
		<Container>
			<FormContainer>
				<AuthTitle title="회원가입" />
				<AuthForm />
			</FormContainer>
			<Background>
				<Text>With Pillivery Ready For Life</Text>
			</Background>
		</Container>
	);
}

export default SignUp;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100vh;
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-top: 50px;
	width: 90%;
	height: 100%;
`;

// 배경 사진이 들어갈 부분
const Background = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url(https://cdn.discordapp.com/attachments/1032488198145835108/1045205511009747074/5.png);
	background-size: cover;
	background-repeat: no-repeat;
	overflow: auto;
`;

// 사진 위에 올릴 문구
const Text = styled.p`
	text-align: end;
	width: min-content;
	color: white;
	font-size: 80px;
	font-weight: var(--extraBold);
	position: absolute;
	bottom: 50px;
	right: 50px;
	-webkit-text-stroke: 3px white;
	user-select: none; // 글씨 드래그 방지
	line-height: 0.9;
`;
