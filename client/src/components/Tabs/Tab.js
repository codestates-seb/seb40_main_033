/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import styled from 'styled-components';

function Tab() {
	const [currentTab, setCurrentTab] = useState(0);
	const [highlight, setHighlight] = useState({ left: 0, width: 50 });

	const menuArr = [
		{ name: 'Tab1', index: 0 },
		{ name: 'Tab2', index: 1 },
		{ name: 'Tab3', index: 2 },
	];

	const selectMenuHandler = (index) => {
		setCurrentTab(index);
	};

	const moveHighlight = (index) => {
		// 선택된 Tab Menu에 따라 하이라이트가 이동
		switch (index) {
			case 0:
				setHighlight({ left: 0, width: 50 });
				break;
			case 1:
				setHighlight({ left: 50, width: 50 });
				break;
			case 2:
				setHighlight({ left: 100, width: 50 });
				break;
			default:
				break;
		}
	};

	return (
		<TabContainer>
			<SNav>
				<TabMenu>
					{menuArr.map(({ name, index }) => (
						<li
							key={index}
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
				</TabMenu>
				<Highlight left={highlight.left} />
			</SNav>
		</TabContainer>
	);
}

export default Tab;

const TabContainer = styled.div`
	background-color: var(--gray-100);
`;

const TabMenu = styled.ul`
	color: var(--gray-300);
	font-weight: bold;
	display: flex;
	flex-direction: row;
	justify-items: center;
	align-items: center;
	list-style: none;
	cursor: pointer;
	z-index: 1;
	position: relative;

	.submenu {
		width: calc(100% / 3);
		text-align: center;
		padding: 15px 10px;
		cursor: pointer;
		transition: all 0.1s ease-in-out;
	}

	.focused {
		color: var(--gray-500);
		transition: all 0.1s ease-in-out;
	}

	& div.desc {
		text-align: center;
	}
`;

const SNav = styled.nav`
	position: relative;
`;

const Highlight = styled.span`
	background: white;
	position: absolute;
	width: calc(100% / 3);
	top: 5px;
	bottom: 5px;
	left: ${(props) => props.left - 1.5}px;
	transition: 0.4s cubic-bezier(0.65, 0, 0.35, 1);
	/* transform: translateX(${({ left }) => left}px); */
	border-radius: 50px;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.07);
`;
