import { useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { BsToggles } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import PriceButton from './PriceButton';
import { LetterButtonColor } from '../LetterButton';
import { LightPurpleButton } from '../PurpleButton';

export function SortButton({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpenClick = () => {
		setIsOpen(!isOpen);
		// console.log(isOpen);
	};
	const menus = ['찜 많은순', '높은가격순', '낮은가격순', '인기순'];
	return (
		<ButtonContainer isOpen={isOpen}>
			{isOpen && (
				<MenuBox isOpen={isOpen}>
					{menus.map((menu, idx) => (
						<MenuLi key={`${idx.toString()}-${menu}`}>
							<LetterButtonColor
								color="gray"
								colorCode="300"
								hoverColor="gray"
								hoverColorCode="400"
								fontSize="14px"
							>
								{menu}
							</LetterButtonColor>
						</MenuLi>
					))}
				</MenuBox>
			)}
			<MainBox>
				{' '}
				<OpenButton onClick={handleOpenClick} isOpen={isOpen}>
					<IoIosArrowBack />
				</OpenButton>
				<NameBox>
					{children}
					<BsToggles />
				</NameBox>
			</MainBox>
		</ButtonContainer>
	);
}

export function PriceSortButton({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpenClick = () => {
		setIsOpen(!isOpen);
		// console.log(isOpen);
	};
	return (
		<ButtonContainer className="price-container" isOpen={isOpen} price>
			{isOpen && <PriceButton min={0} max={100000} />}
			<MainBox>
				<OpenButton onClick={handleOpenClick} isOpen={isOpen}>
					<IoIosArrowBack />
				</OpenButton>
				<RightContainer isOpen={isOpen}>
					<NameBox>
						{children}
						<FiFilter />
					</NameBox>
					{isOpen && (
						<LightPurpleButton fontSize="11px" width="70px" fontWeight="bold">
							할인상품
							<br />
							모아보기
						</LightPurpleButton>
					)}
				</RightContainer>
			</MainBox>
		</ButtonContainer>
	);
}

const ButtonContainer = styled.div`
	position: relative;
	display: inline-flex;
	align-items: center;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
	background-color: white;
	border-radius: 27px;
	border: none;
	color: var(--purple-200);
	padding: 13px 20px 13px 13px;
	transition: 0.5s ease;
	float: right;
	${(props) =>
		props.price && props.isOpen
			? css`
					height: auto;
			  `
			: null}
	&.price-container {
		align-items: flex-start;
		position: absolute;
		right: 0px;
		top: -60px;
		z-index: 999;
	}
`;

const OpenButton = styled.button`
	z-index: 1;
	display: flex;
	flex-direction: row;
	margin-right: 24px;
	justify-content: center;
	align-items: center;
	width: 29px;
	height: 29px;
	background-color: white;
	border: 1px solid #f1f0fe;
	border-radius: 50px;
	cursor: pointer;
	transition: 0.25s ease;
	& > svg {
		path {
			color: var(--purple-200);
		}
	}
	transform: ${({ isOpen }) => (isOpen ? 'rotate(540deg)' : null)};
`;

const MainBox = styled.div`
	background-color: white;
	z-index: 1;
	width: 129px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	button {
		bottom: 20.5px;
		right: 32px;
		position: absolute;
		animation: slide-fade-in-dropdown-animation 0.3s ease-in-out;
	}
`;

const NameBox = styled.div`
	z-index: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 74px;
	font-size: 14px;
	color: var(--purple-200);
	font-weight: var(--bold);
	& > svg {
		path {
			color: var(--purple-200);
		}
		polygon {
			color: var(--purple-200);
		}
	}
`;

const MenuBox = styled.ul`
	list-style-type: none;
	margin-right: 20px;
	margin-left: 23px;
	width: 354px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	animation: ${(isOpen) =>
		isOpen
			? 'slide-fade-in-dropdown-animation 0.4s ease'
			: 'slide-fade-out-dropdown-animation 0.4s ease'};
	@keyframes slide-fade-in-dropdown-animation {
		0% {
			transform: translateX(40%);
			opacity: 0%;
		}

		100% {
			transform: translateX(0);
			opacity: 100%;
		}
	}
	@keyframes slide-fade-out-dropdown-animation {
		0% {
			transform: translateX(0);
			opacity: 0%;
		}

		100% {
			transform: translateX(-100%);
			opacity: 100%;
		}
	}
`;

const MenuLi = styled.li`
	float: left;
	color: var(--gray-300);
	button {
		&:focus {
			color: var(--purple-200);
		}
	}
`;
