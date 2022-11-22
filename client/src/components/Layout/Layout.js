import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import Footer from './Footer';

const hideURL = ['/login', '/signup'];

function Layout() {
	const { pathname } = useLocation();
	const hide = hideURL.includes(pathname);
	return (
		<Container>
			<TopContainer>
				<LeftNav />
				<MainContainer>
					<Outlet />
				</MainContainer>
				<RightNav />
			</TopContainer>
			<Footer />
		</Container>
	);
}

export default Layout;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	min-height: 100vh;
`;

const TopContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: space-between;
`;

const MainContainer = styled.div`
	display: flex;
	margin: 120px 0 180px 0;
	max-width: 1240px;
	width: 100%;
`;
