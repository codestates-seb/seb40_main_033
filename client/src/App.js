import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
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
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
