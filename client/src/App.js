import styled from 'styled-components';
import GlobalStyle from './assets/style/GlobalStyle';
import {
	GrayLetterButton,
	LetterButton,
} from './components/Buttons/LetterButton';
import {
	PurpleButton,
	LightPurpleButton,
} from './components/Buttons/PurpleButton';

const Box = styled.div`
	background-color: var(--gray-200);
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	// 컨텐츠 사이 세로 간격 조절
	& > * + * {
		margin-top: 0.5rem;
	}
`;

const Name = styled.div`
	font-weight: var(--regular);
`;
const Price = styled.div`
	font-size: 16px;
	font-weight: var(--extraBold);
`;
function App() {
	return (
		<>
			<GlobalStyle />
			<Box>
				<LightPurpleButton>작성하기</LightPurpleButton>
				<PurpleButton>작성하기</PurpleButton>
				<LetterButton>수정 / 삭제</LetterButton>
				<GrayLetterButton>수정 / 삭제</GrayLetterButton>
				<Name>멀티비타민 6,000원</Name>
				<Price>2개 / 12,000원</Price>
			</Box>
		</>
	);
}

export default App;
