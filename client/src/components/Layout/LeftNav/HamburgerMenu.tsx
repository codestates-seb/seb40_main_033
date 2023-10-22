import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import MenuCategory from './MenuCategory';

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

const Hamburger = styled.div<{ isMenuOpen: boolean }>`
	margin: 45px 0 20px 0;
	cursor: pointer;

	div {
		width: 18px;
		height: 3px;
		margin: 3.5px 0;
		background-color: var(--purple-200);
		border-radius: 4px;
		cursor: pointer;
		transition: 0.5s;
	}

	${({ isMenuOpen }) =>
		isMenuOpen &&
		css`
			> :first-child {
				-webkit-transform: translateY(6.5px) rotate(-315deg);
				transform: translateY(6.5px) rotate(-315deg);
			}
			> :nth-child(2) {
				opacity: 0;
			}
			> :last-child {
				-webkit-transform: translateY(-6.5px) rotate(315deg);
				transform: translateY(-6.5px) rotate(315deg);
			}
		`}
`;
