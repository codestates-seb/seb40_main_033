import styled from 'styled-components';
import GlobalStyle from './assets/style/GlobalStyle';
// import Review from './components/List/Review';
// import CartList from './components/List/CartList';
// import PayList from './components/List/PayList';
// import OrderList from './components/List/OrderList';
// import DetailList from './components/List/DetailList';
// import ReviewForm from './components/List/RewiewForm';
// import DetailTalk from './components/Talk/DetailTalk';
// import DetailComment from './components/Talk/DetailComment';
import Talk from './components/Talk/Talk';
import Comment from './components/Talk/Comment';

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
		margin-top: 1rem;
	}
`;

function App() {
	return (
		<>
			<GlobalStyle />
			<Box>
				<Talk />
				<Comment />
			</Box>
		</>
	);
}

export default App;
