import { useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import { BsToggles } from 'react-icons/bs';
import { FiFilter } from 'react-icons/fi';
import PriceButton from './PriceButton';
import { LetterButtonColor } from '../LetterButton';

export function SortButton({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpenClick = () => {
		setIsOpen(!isOpen);
		// console.log(isOpen);
	};
	const menus = ['찜 많은순', '높은가격순', '낮은가격순', '인기순'];
	return (
		<ButtonContainer isOpen={isOpen}>
			{isOpen ? (
				<MenuBox isOpen={isOpen}>
					{menus.map((menu, idx) => (
						<MenuLi key={`${idx.toString()}-${menu}`}>
							<LetterButtonColor color="gray" colorCode="200" fontSize="14px">
								{menu}
							</LetterButtonColor>
						</MenuLi>
					))}
				</MenuBox>
			) : null}
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
		<ButtonContainer isOpen={isOpen} price>
			{isOpen ? <PriceButton min={0} max={100000} /> : null}
			<MainBox>
				<OpenButton onClick={handleOpenClick} isOpen={isOpen}>
					<IoIosArrowBack />
				</OpenButton>
				<NameBox>
					{children}
					<FiFilter />
				</NameBox>
			</MainBox>
		</ButtonContainer>
	);
}

const ButtonContainer = styled.div`
	/* margin-left: 50%; */
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	align-items: baseline;
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
					align-items: baseline;
					height: auto;
					padding: 13px 20px 13px 20px;
			  `
			: null}/* position: absolute;
	top: 0;
	right: 0; //float: right 대신 써줘도 됩니다. 둘다 보기에는 같은데 나중에 뭐 쓸지 함 봐야할듯.*/
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
	transform: ${({ isOpen }) => (isOpen ? 'scaleX(-1)' : null)};
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

const NameBox = styled.div`
	z-index: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 72px;
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
		}

		100% {
			transform: translateX(0);
		}
	}
	@keyframes slide-fade-out-dropdown-animation {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-100%);
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
