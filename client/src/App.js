import styled from 'styled-components';
import GlobalStyle from './assets/style/GlobalStyle';
import CounterBtn from './components/\bCounterBtn';

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
			<CounterBtn />
		</>
	);
}

export default App;
