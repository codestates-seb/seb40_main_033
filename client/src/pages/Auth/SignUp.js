/* eslint-disable no-shadow */
import styled from 'styled-components';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import AuthTitle from '../../components/Etc/AuthTitle';
import { AuthForm } from '../../components/Inputs/AuthForm';
import { fetchMoreInfo, fetchSignUp } from '../../apis/userApis';
import { login } from '../../redux/slice/userSlice';
import { Logo } from '../../assets/Icons';

// 회원가입 페이지
function SignUp() {
	const [searchParams] = useSearchParams();
	const email = searchParams.get('email') || '';
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { mutate } = useMutation(
		(form) => (email ? fetchMoreInfo(form) : fetchSignUp(form)),
		{
			onSuccess: async (_, { email }) => {
				toast.success('회원가입을 축하합니다 !');
				dispatch(login({ email }));
				navigate('/login');
			},
			onError: async (data) => {
				const { response } = data;
				const { data: errorData } = response;
				toast.error(errorData.message);
			},
		},
	);

	const handleSignUp = (data) => {
		mutate(data);
	};

	return (
		<AuthContainer>
			<FormContainer>
				<Link to="/">
					<Logo />
				</Link>
				<AuthTitle title="회원가입" />
				<AuthForm signUp handleSignUp={handleSignUp} email={email} />
				<LinkContainer>
					이미 계정이 있으신가요? <Link to="/login">로그인</Link>
				</LinkContainer>
			</FormContainer>
			<Background>
				<Text>With Pillivery Subscribe Health</Text>
			</Background>
		</AuthContainer>
	);
}

export default SignUp;

export const AuthContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100vh;
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	position: relative;
	align-items: center;
	padding-top: 50px;
	width: 90%;
	height: 100%;

	& > a {
		svg {
			position: absolute;
			left: 40px;
			top: 45px;
		}
	}
`;

export const LinkContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	a {
		color: var(--purple-200);
		margin-left: 5px;
	}
`;

// 배경 사진이 들어갈 부분
export const Background = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url(https://cdn.discordapp.com/attachments/1032488198145835108/1045205511009747074/5.png);
	background-size: cover;
	background-repeat: no-repeat;
	overflow: auto;
`;

// 사진 위에 올릴 문구
export const Text = styled.p`
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
