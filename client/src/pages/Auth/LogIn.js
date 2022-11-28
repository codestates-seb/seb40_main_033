/* eslint-disable no-return-assign */
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../../apis/login';
import AuthTitle from '../../components/Etc/AuthTitle';
import { AuthForm } from '../../components/Inputs/AuthForm';
import {
	AuthContainer,
	Background,
	FormContainer,
	LinkContainer,
	Text,
} from './SignUp';
import SocialLogin from './SocialLogin';

// 로그인 페이지
function LogIn() {
	// 다른 페이지로 이동 후 뒤로가기 시 로그인 페이지로 이동하지 않도록 함
	const navigate = useNavigate();

	const { mutate, isLoading, isSuccess, isError } = useLogin();
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

	return (
		<AuthContainer>
			<FormContainer>
				<AuthTitle title="로그인" />
				<AuthForm mutate={mutate} />
				<SocialLogin />
				<LinkContainer>
					아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
					{/* <text onClick={() => navigate('/signup', { replace: true })}>
						회원가입
					</text> */}
				</LinkContainer>
			</FormContainer>
			<Background>
				<Text>With Pillivery Ready For Life</Text>
			</Background>
		</AuthContainer>
	);
}

export default LogIn;
