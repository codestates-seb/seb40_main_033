import { useCallback, useState } from 'react';
import MenuCategory from './MenuCategory';
import { Hamburger } from './style';

export default function HamburgerMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuOpen: React.MouseEventHandler<HTMLDivElement> =
		useCallback(() => {
			setIsMenuOpen(!isMenuOpen);
		}, [isMenuOpen]);

	return (
		<>
			<Hamburger onClick={handleMenuOpen} isMenuOpen={isMenuOpen}>
				<div />
				<div />
				<div />
			</Hamburger>
			{isMenuOpen && <MenuCategory />}
		</>
	);
}
