import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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

	const url = new URL(window.location.href);
	console.log('🚀 ~ file: SignUp.js ~ url', url);
	const token = url.searchParams.get('accessToken');
	console.log('🚀 ~ file: SignUp.js ~ token', token);

	const handleLogIn = (data) => {
		mutate({ email: data.이메일, password: data.비밀번호 });
	};

	const LoginData = {
		username: 'tkfka156@gmail.com',
		password: 'sdfkemdff',
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
				<AuthTitle title="로그인" />
				<AuthForm handleLogIn={handleLogIn} />
				<SocialLogIn />
				<LinkContainer>
					아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
					{/* <text onClick={() => navigate('/signup', { replace: true })}>
						회원가입
					</text> */}
				</LinkContainer>
				<button type="button" onClick={logIn}>
					로그인
				</button>
			</FormContainer>
			<Background>
				<Text>With Pillivery Ready For Life</Text>
			</Background>
		</AuthContainer>
	);
}

export default LogIn;
