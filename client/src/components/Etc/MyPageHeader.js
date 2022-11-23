import styled from 'styled-components';
import { TempLogo } from '../../assets/Icons';
import { GrayLetterButton } from '../Buttons/LetterButton';

function MyPageHeader({ nickname }) {
	return (
		<Container>
			<TempLogo />
			<TextContainer>
				<Nickname>{nickname || '타락파워전사'}</Nickname>
				<Nim>님</Nim>
				<GrayLetterButton fontSize="13px">로그아웃</GrayLetterButton>
			</TextContainer>
		</Container>
	);
}

const Container = styled.header`
	display: flex;
	flex-direction: column;
	width: 100%;
	svg {
		width: 43px;
		height: 20px;
	}
`;

const TextContainer = styled.div`
	display: flex;
	align-items: flex-end;
	border-bottom: 1px solid var(--gray-200);
	padding: 15px 0 30px 0;
`;

const Nim = styled.div`
	color: var(--gray-400);
	font-size: 36px;
	font-weight: var(--bold);
	margin-left: 7px;
	margin-right: 25px;
`;

const Nickname = styled.h1`
	font-size: 36px;
	font-weight: var(--extraBold);
	color: var(--gray-600);
`;

export default MyPageHeader;
