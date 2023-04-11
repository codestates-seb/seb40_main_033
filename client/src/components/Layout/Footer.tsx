import styled, { css } from 'styled-components';
import { Logo } from '../../assets/Icons';
import { FOOTER_INFO } from '../../assets/constants/Constants';

function Footer() {
	return (
		<FooterContainer>
			<Top>
				<Title href="https://codestates.notion.site/40-Team033-Pillivery-830d5cf6ce4d4b6cbc6918d2d676bbb5">
					서비스 소개
				</Title>
				<Title href="https://github.com/codestates-seb/seb40_main_033">
					GitHub
				</Title>
				<Title href="https://www.figma.com/file/nUM8AqkQE17BEYgI803vO3/%ED%83%80%EB%9D%BD%ED%8C%8C%EC%9B%8C%EC%A0%84%EC%82%AC-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84%2F%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85-(%EC%B5%9C%EC%A2%85)?node-id=0%3A1&t=vqn7R6DzWKlpTIyl-1">
					Figma
				</Title>
			</Top>
			<Body>
				<BoxLeft>
					<Info>{FOOTER_INFO.BUSINESS}</Info>
					<MemberContainer>
						{FOOTER_INFO.MEMBERS.map((member, idx) => (
							<Member
								key={member.id}
								href={`https://github.com/${member.account}`}
								idx={idx}
							>
								{member.name}
							</Member>
						))}
					</MemberContainer>
					<Info Copyright>{FOOTER_INFO.COPYRIGHT}</Info>
				</BoxLeft>
				<BoxRight>
					<Logo />
					<Title brand>{FOOTER_INFO.BRAND_NAME}</Title>
					<Slogan>{FOOTER_INFO.SLOGAN}</Slogan>
				</BoxRight>
			</Body>
		</FooterContainer>
	);
}

const FooterContainer = styled.footer`
	background-color: var(--gray-500);
	height: 365px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	* {
		color: var(--gray-300);
	}
`;

const Top = styled.div`
	display: flex;
	width: 1100px;
	border-bottom: 1px solid var(--gray-300);
	padding-bottom: 25px;
`;

const Title = styled.a<{ brand?: boolean }>`
	font-size: 16px;
	font-weight: var(--bold);
	margin: 0 30px 0 70px;

	${({ brand }) =>
		brand &&
		css`
			font-weight: var(--regular);
			font-size: 20px;
			margin: 0;
		`}
`;

const Body = styled.div`
	width: 68%;
	display: flex;
	justify-content: space-between;
	padding-top: 40px;
`;

const Info = styled.div<{ Copyright?: boolean }>`
	font-size: 14px;
	white-space: pre-wrap;
	line-height: 1.5;

	${({ Copyright }) =>
		Copyright &&
		css`
			font-weight: var(--light);
			font-size: 13px;
		`};
`;

const BoxLeft = styled.div`
	flex-direction: column;
	display: flex;
`;

const MemberContainer = styled.div`
	display: flex;
	margin-bottom: 35px;
`;

const Member = styled.a<{ idx: number }>`
	margin-top: 40px;
	font-size: 14px;
	height: fit-content;
	align-self: flex-start;
	border-right: ${({ idx }) =>
		idx === 6 ? 'none' : '1px solid var(--gray-300)'};
	padding: ${({ idx }) => (idx === 0 ? '0 20px 0 0px' : '0 20px')};
`;

const BoxRight = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	width: 30%;
	padding-left: 20px;
	margin-bottom: 20px;

	svg {
		position: relative;
		top: 6px;
		margin-right: 14px;
		* {
			fill: var(--gray-300);
		}
	}
`;

const Slogan = styled.div`
	font-weight: var(--light);
	width: fit-content;
	font-size: 13px;
	position: absolute;
	bottom: 59px;
	left: 65px;
`;

export default Footer;
