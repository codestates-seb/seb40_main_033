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
			<Background />
		</Container>
	);
}

export default SignUp;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	// 내용물이 반반 비율로 나눠지도록
	/* flex: 1; */
	width: 100%;
	height: 100vh;
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-top: 50px;
	width: 80%;
	height: 100%;
`;

// 배경 사진이 들어갈 부분
const Background = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(https://cdn.discordapp.com/attachments/1032488198145835108/1045154776045850644/2.png);
	background-size: cover;
	/* background-position: center; */
	background-repeat: no-repeat;
`;
