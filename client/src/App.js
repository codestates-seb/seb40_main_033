import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import GlobalStyle from './assets/style/GlobalStyle';
import Router from './Router';
import store from './redux/store/store';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<GlobalStyle />
				<Router />
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
