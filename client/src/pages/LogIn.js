import { Link } from 'react-router-dom';
import AuthTitle from '../components/Etc/AuthTitle';
import { AuthForm } from '../components/Inputs/AuthForm';
import {
	AuthContainer,
	Background,
	FormContainer,
	LinkContainer,
	Text,
} from './SignUp';

// 로그인 페이지
function LogIn() {
	return (
		<AuthContainer>
			<FormContainer>
				<AuthTitle title="로그인" />
				<AuthForm />
				<LinkContainer>
					아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
				</LinkContainer>
			</FormContainer>
			<Background>
				<Text>With Pillivery Ready For Life</Text>
			</Background>
		</AuthContainer>
	);
}

export default LogIn;
