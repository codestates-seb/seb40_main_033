import { Link } from 'react-router-dom';
import { Logo } from '../../../assets/Icons';
import HamburgerMenu from './HamburgerMenu';
import { Container, Nav } from './style';

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

export default LeftNav;
