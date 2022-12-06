import { Link } from 'react-router-dom';
import useLogIn from '../../hooks/useLogIn';
import AuthTitle from '../../components/Etc/AuthTitle';
import { AuthForm } from '../../components/Inputs/AuthForm';
import {
	AuthContainer,
	Background,
	FormContainer,
	LinkContainer,
	Text,
} from './SignUp';
import SocialLogIn from './SocialLogIn';
import { Logo } from '../../assets/Icons';

// 로그인 페이지
function LogIn() {
	const { mutate } = useLogIn();

	const handleLogIn = (data) => {
		mutate({ email: data.이메일, password: data.비밀번호 });
	};

	return (
		<AuthContainer>
			<FormContainer>
				<Link to="/">
					<Logo />
				</Link>
				<AuthTitle title="로그인" />
				<AuthForm handleLogIn={handleLogIn} />
				<SocialLogIn />
				<LinkContainer>
					아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
				</LinkContainer>
			</FormContainer>
			<Background>
				<Text>With Pillivery Subscribe Health</Text>
			</Background>
		</AuthContainer>
	);
}

export default LogIn;
