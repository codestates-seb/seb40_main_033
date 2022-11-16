import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './assets/style/GlobalStyle';

const Box = styled.div`
	color: var(--purple-200);
	background-color: var(--gray-200);
	width: 100px;
	height: 100px;
`;

function App() {
	return (
		<>
			<GlobalStyle />
			<Box>hello world 안녕하세요! 반갑습니다~</Box>
		</>
	);
}

export default App;
