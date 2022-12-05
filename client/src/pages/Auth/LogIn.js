import { useSelector } from 'react-redux';
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
	// 다른 페이지로 이동 후 뒤로가기 시 로그인 페이지로 이동하지 않도록 함
	const { mutate, isLoading, isSuccess, isError } = useLogIn();
	const { loginStatus, accessToken, email } = useSelector(
		(store) => store.user,
	);
	console.log(
		'email',
		email,
		'loginStatus',
		loginStatus,
		'accessToken',
		accessToken,
	);

	const handleLogIn = (data) => {
		mutate({ email: data.이메일, password: data.비밀번호 });
	};

	const LoginData = {
		username: 'tkfka156@gmail.com',
		password: 'asdfg',
	};
	const URI =
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080';
	const logIn = () => {
		fetch(`${URI}/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(LoginData),
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
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
