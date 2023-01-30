import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GlobalStyle from './assets/style/GlobalStyle';
import Router from './Router';
import store from './redux/store/store';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			cacheTime: Infinity,
		},
	},
});

function App() {
	return (
		<HelmetProvider>
			<Helmet title="Pillivery | With Pillivery Subscribe Health" />
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<GlobalStyle />
					<Router />
				</Provider>
				<ToastContainer
					position="top-center"
					autoClose={3000}
					theme="colored"
				/>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</HelmetProvider>
	);
}

export default App;
