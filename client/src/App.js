import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from './assets/style/GlobalStyle';
import Router from './Router';
import store from './redux/store/store';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<GlobalStyle />
				<Router />
			</Provider>
			<ToastContainer position="top-center" autoClose={3000} theme="colored" />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
