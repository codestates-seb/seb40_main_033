import styled from 'styled-components';
import { Logo } from '../../assets/Icons';

function Footer() {
	return (
		<FooterContainer>
			<Wrap>
				<Top>
					<Title
						as="a"
						href="https://github.com/codestates-seb/seb40_main_033"
						target="_blank"
						rel="noopener noreferrer"
					>
						서비스 소개
					</Title>
					<Title
						as="a"
						href="https://github.com/codestates-seb/seb40_main_033"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</Title>
					<Title
						as="a"
						href="https://github.com/codestates-seb/seb40_main_033"
						target="_blank"
						rel="noopener noreferrer"
					>
						Figma
					</Title>
				</Top>
				<Body>
					<BoxLeft>
						<Text>
							서울특별시 강남구 영양대로 필리길 305, 3355호, 대표자: 김필리
						</Text>
						<Text>
							사업자 번호: 123-45-678900 , 통신판매업신고번호:
							2022-서울강남-221204
						</Text>
						<Text>고객센터: 1234-1234</Text>
						<Text>E-mail: pillivery@pillivery.com</Text>
						<Box>
							<Contents
								as="a"
								href="https://github.com/dohyeons"
								target="_blank"
								rel="noopener noreferrer"
								className="first"
							>
								도현수
							</Contents>
							<Contents
								as="a"
								href="https://github.com/uxolrv"
								target="_blank"
								rel="noopener noreferrer"
							>
								김세연
							</Contents>
							<Contents
								as="a"
								href="https://github.com/kihyeoon"
								target="_blank"
								rel="noopener noreferrer"
							>
								방기현
							</Contents>
							<Contents
								as="a"
								href="https://github.com/jihwanAn"
								target="_blank"
								rel="noopener noreferrer"
							>
								안지환
							</Contents>
							<Contents
								as="a"
								href="https://github.com/zirryo"
								target="_blank"
								rel="noopener noreferrer"
							>
								김지효
							</Contents>
							<Contents
								as="a"
								href="https://github.com/jisoo27"
								target="_blank"
								rel="noopener noreferrer"
							>
								김지수
							</Contents>
							<Contents
								as="a"
								href="https://github.com/choizz156"
								target="_blank"
								rel="noopener noreferrer"
								className="last"
							>
								최민석
							</Contents>
						</Box>
						<Copyright>© Copyright ⓒ 2022 Pillivery</Copyright>
					</BoxLeft>
					<BoxRight>
						<Logo />
						<Pil>Pillivery</Pil>
					</BoxRight>
				</Body>
			</Wrap>
		</FooterContainer>
	);
}

const FooterContainer = styled.footer`
	background-color: var(--gray-500);
	width: 100%;
	height: 365px;
	display: flex;
	justify-content: center;
	align-items: center;
	* {
		color: var(--gray-300);
	}
`;

const Wrap = styled.div`
	width: 1100px;
	height: 290px;
	display: grid;
`;

const Top = styled.div`
	margin-top: 5px;
	display: flex;
`;

const Title = styled.div`
	font-size: 16px;
	font-weight: var(--bold);
	margin-left: 90px;
`;

const Body = styled.div`
	border-top: 1px solid white;
	height: 220px;
	display: flex;
	justify-content: space-between;
	padding-top: 60px;
`;

const Text = styled.div`
	color: var(--gray-300);
	font-weight: var(--regular);
	margin-bottom: 7px;
	font-size: 14px;
`;

const BoxLeft = styled.div`
	flex-direction: column;
	display: flex;
	justify-content: center;
	margin-left: 40px;
`;

const Box = styled.div`
	display: flex;
`;

const Contents = styled.div`
	/* color: var(--gray-200); */
	font-weight: var(--regular);
	margin-top: 50px;
	height: fit-content;
	padding: 0 20px;
	border-right: 1px solid var(--gray-200);
	&.first {
		padding: 0 20px 0 0;
	}
	&.last {
		border: none;
	}
`;

const BoxRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 200px;
	margin-bottom: 10px;
	svg {
		margin-right: 12px;
		* {
			fill: var(--gray-200);
		}
	}
`;

const Img = styled.div`
	border: 1px solid var(--gray-200);
	width: 60px;
	height: 60px;
	margin-top: 30px;
	margin-right: 30px;
`;

const Pil = styled.div`
	font-weight: var(--bold);
	font-size: 18px;
`;

const Copyright = styled.div`
	font-weight: var(--light);
	font-size: 13px;
	margin-top: 30px;
	/* margin-left: 200px; */
`;

export default Footer;
