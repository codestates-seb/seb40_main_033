/* eslint-disable no-nested-ternary */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from 'react';
import styled from 'styled-components';

function DefaultTabButton({ menuArr, delayButton, toggle }) {
	const [currentTab, setCurrentTab] = useState(0);
	const [highlight, setHighlight] = useState({ left: 0, width: 77 });
	const [delayOpen, setDelayOpen] = useState(false);
	const menuEl = useRef(null);

	const selectMenuHandler = (index) => {
		setCurrentTab(index);
	};

	const moveHighlight = (index) => {
		// 선택된 Tab Menu에 따라 하이라이트가 이동
		const left = menuEl.current.children[index].offsetLeft;
		const width = menuEl.current.children[index].offsetWidth;
		switch (index) {
			case 0:
				setHighlight({
					left,
					width,
				});
				break;
			case 1:
				setHighlight({
					left,
					width,
				});
				break;
			case 2:
				setHighlight({
					left,
					width,
				});
				break;
			case 3:
				setHighlight({
					left,
					width,
				});
				break;
			default:
				break;
		}
	};

	return (
		<TabContainer toggle={toggle}>
			<TabMenu ref={menuEl}>
				{menuArr.map(({ name, index }) => (
					<li
						key={`${index}-${name}`}
						className={currentTab === index ? 'submenu focused' : 'submenu'}
						onClick={() => {
							{
								selectMenuHandler(index);
								moveHighlight(index);
							}
						}}
					>
						{name}
					</li>
				))}
				{delayButton && (
					<li
						className={`submenu red ${delayOpen ? 'open' : ''}`}
						onClick={() => setDelayOpen((prev) => !prev)}
					>
						미루기
					</li>
				)}
			</TabMenu>
			<Highlight
				left={highlight.left}
				width={highlight.width}
				toggle={toggle}
			/>
		</TabContainer>
	);
}

export default DefaultTabButton;

const TabContainer = styled.div`
	background-color: ${({ toggle }) => (toggle ? 'white' : 'var(--gray-100)')};
	position: relative;
	width: fit-content;
	padding-left: 8px;
	padding-right: 8px;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.07);
	border-radius: 50px;
`;

const TabMenu = styled.ul`
	display: flex;
	justify-items: center;
	align-items: center;
	list-style: none;
	cursor: pointer;
	z-index: 1;
	position: relative;

	.submenu {
		font-size: 18px;
		color: var(--gray-300);
		text-align: center;
		padding: 20px 20px;
		cursor: pointer;
		transition: all 0.4s ease-in-out;
	}

	.focused {
		color: var(--gray-500);
		transition: all 0.4s ease-in-out;
	}

	.red {
		color: var(--red-100);
	}

	.open {
		box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.07);
		background: white;
		border-radius: 50px;
		padding: 14px 20px;
	}
`;

const Highlight = styled.span`
	background: ${({ toggle }) => (toggle ? 'var(--gray-100)' : 'white')};
	position: absolute;
	width: ${(props) => props.width}px;
	top: 6px;
	bottom: 6px;
	transition: 0.4s cubic-bezier(0.65, 0, 0.35, 1);
	left: ${(props) => props.left + 8}px;
	/* transform: translateX(${({ left }) => left}px); */
	border-radius: 50px;
	box-shadow: ${({ toggle }) => (toggle ? 'inset' : '')} 0px 1px 8px
		rgba(0, 0, 0, 0.07);
`;
