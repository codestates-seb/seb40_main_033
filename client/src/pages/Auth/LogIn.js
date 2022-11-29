import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();

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
		toast.success('로그인 되었습니다 !');
		navigate(-1, { replace: true });
	};
	const handleToast = () => {
		toast.success('로그인 되었습니다 !');
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
				<button type="button" onClick={handleToast}>
					toast
				</button>
			</FormContainer>
			<Background>
				<Text>With Pillivery Ready For Life</Text>
			</Background>
		</AuthContainer>
	);
}

export default LogIn;
