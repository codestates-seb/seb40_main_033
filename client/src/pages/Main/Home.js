import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainCaroucel from '../../components/Caroucel/MainCaroucel';
import { login } from '../../redux/slice/userSlice';
import MainSection from './MainSection';

function Home() {
	useEffect(() => {
		const dispatch = useDispatch();
		const url = new URL(window.location.href);
		const accessToken = url.searchParams.get('access_token');
		const refreshToken = url.searchParams.get('refresh_token');
		if (accessToken) {
			dispatch(login({ accessToken, refreshToken, isSocial: true }));
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
		}
	}, []);

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
