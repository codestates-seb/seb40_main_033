import styled, { css, keyframes } from 'styled-components';

// HamburgerMenu.tsx
export const Hamburger = styled.div<{ isMenuOpen: boolean }>`
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

// LeftNav.tsx
export const Container = styled.div`
	position: relative;
`;

export const Nav = styled.nav`
	position: sticky;
	top: 45px;
	margin: 45px 0 0 40px;
	display: flex;
	flex-direction: column;
	width: 100px;
`;

// LeftNavMenu.tsx
export const showIcon = keyframes`
	0% {
		opacity: 0%;
		left: -20px;
	}
	100% {
	opacity: 100%;
	left: 0;
	}
`;

export const turn = keyframes`
	0% {
		opacity: 0;
		-webkit-transform: translateY(6.5px) rotate(-360deg);
		transform: translateY(6.5px) rotate(-360deg);
	}
	100% {
		opacity: 50%;
	}
`;

export const listHover = keyframes`
	0% {
		opacity: 0;
		top: -10px;
		pointer-events: none;
	}
	100% {
		top: 0;
		opacity: 100%;
		pointer-events: none;
	}
`;

export const ListContainer = styled.li`
	display: flex;
	align-items: center;
	-webkit-user-select: none;
	user-select: none;
	cursor: pointer;
	position: relative;
	animation: ${listHover} 0.3s ease-in-out;

	:hover {
		animation: ${showIcon} 0.2s ease-in-out 1s;
		* {
			color: var(--green-100);
			stroke: var(--green-100);
		}
	}

	& > svg {
		margin: 10px 5px 10px 0;
		font-size: 27px;
		animation: ${turn} 0.3s ease-in-out;
		pointer-events: none;
	}

	.small {
		font-size: 23px;
	}

	.bold-stroke {
		stroke-width: 15;
	}

	.bolt {
		font-size: 26px;
		stroke-width: 10;
	}

	.heart-add {
		font-size: 24px;
	}
`;

export const Category = styled.div`
	color: var(--purple-200);
	margin: 20px 0;
	font-weight: var(--extraBold);
	font-size: 13.6px;
	white-space: nowrap;
`;

// MenuCategory.tsx
export const openList = keyframes`
	0% {
		opacity: 0;
		top: -20px;
	}
	100% {
		top: 0;
		opacity: 100%;
	}
`;

export const CategoryContainer = styled.ul`
	display: flex;
	flex-direction: column;
	position: relative;
	animation: ${openList} 0.3s ease-in-out;
`;
