import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from './assets/style/GlobalStyle';
import Router from './Router';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyle />
			<Router />
		</QueryClientProvider>
	);
}

export default App;
