import { useDispatch } from 'react-redux';
import MainCaroucel from '../../components/Caroucel/MainCaroucel';
import { login } from '../../redux/slice/userSlice';
import MainSection from './MainSection';

function Home() {
	const dispatch = useDispatch();
	const url = new URL(window.location.href);
	const accessToken = url.searchParams.get('access_token');
	console.log('🚀 ~ file: SignUp.js ~ token', accessToken);
	dispatch(login({ accessToken }));

	return (
		<div>
			<MainCaroucel />
			<MainSection />
			<MainSection />
			<MainSection />
		</div>
	);
}

export default Home;
