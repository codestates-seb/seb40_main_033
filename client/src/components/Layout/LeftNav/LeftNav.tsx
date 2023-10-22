import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/Icons';
import HamburgerMenu from './HamburgerMenu';

function LeftNav() {
	return (
		<Container>
			<Nav>
				<Link to="/">
					<Logo />
				</Link>
				<HamburgerMenu />
			</Nav>
		</Container>
	);
}

const Container = styled.div`
	position: relative;
`;

const Nav = styled.nav`
	position: sticky;
	top: 45px;
	margin: 45px 0 0 40px;
	display: flex;
	flex-direction: column;
	width: 100px;
`;

export default LeftNav;
