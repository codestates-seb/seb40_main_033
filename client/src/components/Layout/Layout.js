import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import Footer from './Footer';

const hideURL = ['/login', '/signup'];

function Layout() {
	const { pathname } = useLocation();
	const hide = hideURL.includes(pathname);
	const firstPathname = pathname.split('/')[1];

	return (
		<Container pathname={firstPathname}>
			<TopContainer>
				{hide || <LeftNav />}
				<MainContainer className={hide ? 'noMargin' : null}>
					<Outlet />
				</MainContainer>
				{hide || <RightNav />}
			</TopContainer>
			{hide || <Footer />}
		</Container>
	);
}

export default Layout;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-width: fit-content;
	min-height: 100vh;
	${({ pathname }) => {
		switch (pathname) {
			case 'cart':
			case 'pay':
				return `
				background-color: var(--gray-100)
				`;
			case 'mypage':
				return `
				background-image: linear-gradient(to bottom, white 283px, var(--gray-100) 0)
				`;
			case '':
				return `
				background-image: linear-gradient(to bottom, white 770px, var(--gray-100) 0)
				`;
			default:
				return `
				background-color: white`;
		}
	}}
`;

const TopContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: space-between;
`;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 120px;
	padding-bottom: 180px;
	max-width: 1240px;
	width: 100%;
	&.noMargin {
		margin: 0;
		max-width: none;
		padding-bottom: 0;
	}
`;
