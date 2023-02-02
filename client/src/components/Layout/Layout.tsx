import styled, { css } from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import Footer from './Footer';

const hiddenPath = ['/login', '/signup'];

function Layout() {
	const { pathname } = useLocation();
	const [isHiddenPath, setIsHiddenPath] = useState(
		hiddenPath.includes(pathname),
	);
	const firstPathname = pathname.split('/')[1];

	useLayoutEffect(() => {
		setIsHiddenPath(hiddenPath.includes(pathname));
	}, [pathname]);

	return (
		<Container pathname={firstPathname}>
			<TopContainer>
				{isHiddenPath || <LeftNav />}
				<MainContainer isHiddenPath={isHiddenPath}>
					<Outlet />
				</MainContainer>
				{isHiddenPath || <RightNav />}
			</TopContainer>
			{isHiddenPath || <Footer />}
		</Container>
	);
}

export default Layout;

const Container = styled.div<{ pathname: string }>`
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
	justify-content: space-between;
	width: 100%;
	height: 100%;
`;

const MainContainer = styled.div<{ isHiddenPath: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	${({ isHiddenPath }) =>
		isHiddenPath
			? css`
					margin: 0;
					padding-bottom: 0;
					max-width: none;
			  `
			: css`
					margin-top: 120px;
					padding-bottom: 180px;
					max-width: 1240px;
			  `}
`;
