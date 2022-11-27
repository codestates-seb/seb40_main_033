import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthTitle from '../../components/Etc/AuthTitle';
import { AuthForm } from '../../components/Inputs/AuthForm';

const URI = 'https://dangerous-newt-46.loca.lt';
const data = {
	userId: 1,
	displayName: 'loopy12',
	realName: '손오공',
	address: '서울특별시 부평구 본동 광명아파트',
	phone: '03030303030',
	detailAddress: 'sdfsdsdf',
};
// 회원가입 페이지
function SignUp() {
	const handleGet = () => {
		fetch(`${URI}/users/more-info`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
	};
	const token =
		'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoiYmFuZ2lvbjkzQGdtYWlsLmNvbSIsInN1YiI6ImJhbmdpb245M0BnbWFpbC5jb20iLCJleHAiOjE2Njk1NDkzOTAsImlhdCI6MTY2OTU0NzU5MH0.uFow8FzJCVwVsNF94N6RANTrxrxdoqmhyLez8Z76TQg';

	const handleLogOut = () => {
		fetch(`${URI}/users/logout`, {
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
	};

	return (
		<AuthContainer>
			<FormContainer>
				<AuthTitle title="회원가입" />
				<AuthForm signUp />
				<button type="button" onClick={handleGet}>
					겟요청
				</button>
				<button type="button" onClick={handleLogOut}>
					로그아웃
				</button>
				<LinkContainer>
					이미 계정이 있으신가요? <Link to="/login">로그인</Link>
				</LinkContainer>
			</FormContainer>
			<Background>
				<Text>With Pillivery Ready For Life</Text>
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
	align-items: center;
	padding-top: 50px;
	width: 90%;
	height: 100%;
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
