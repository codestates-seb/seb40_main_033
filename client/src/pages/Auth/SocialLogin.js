import styled from 'styled-components';

import { ReactComponent as Google } from '../../assets/images/social/google.svg';
import Kakao from '../../assets/images/social/kakao.png';

const KakaoImg = styled.img.attrs({
	src: Kakao,
})`
	height: 40px;
	width: 40px;
	padding: 9px 7px 7px 8px;
`;

const GoogleSVG = styled(Google)`
	height: 40px;
	width: 40px;
`;

const SSection = styled.section`
	display: flex;
	flex-flow: column;
	align-items: center;
	row-gap: 10px;
	margin: 10px 25px;
	width: 166px;
`;

const SocialButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	width: 80%;
	height: 35px;
	overflow: hidden;
	border-radius: 50px;
	border: none;
	background-color: white;
	${({ kakao }) =>
		kakao &&
		`background-color: #FEE500;
  	padding-right: 10px;
  `}
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: 0.25s ease;
	&:hover {
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
	}
	&:active {
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
	}
	> p {
		// 폰트 굵기
		font-weight: var(--bold);
		position: absolute;
		left: 44px;
	}
	> svg,
	img {
		position: absolute;
		left: 6px;
	}
`;

export default function SocialLogIn() {
	const URI =
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization';
	const loginRequestHandler = (type) => {
		window.location.assign((window.location.href = `${URI}/${type}`));
	};

	return (
		<SSection>
			<SocialButton onClick={() => loginRequestHandler('google')} google>
				<GoogleSVG viewBox="4 4 38 38" />
				<p>구글 로그인</p>
			</SocialButton>
			<SocialButton onClick={() => loginRequestHandler('kakao')} kakao>
				<KakaoImg />
				<p>카카오 로그인</p>
			</SocialButton>
		</SSection>
	);
}
