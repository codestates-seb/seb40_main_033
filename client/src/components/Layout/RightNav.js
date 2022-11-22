import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
	AiOutlineUser,
	AiOutlineSearch,
	AiOutlineShoppingCart,
} from 'react-icons/ai';
import { turn, listHover } from './LeftNav';

function RightNav() {
	const [click, setClick] = useState(false);

	const clickBtn = () => {
		setClick(!click);
	};

	return (
		<Nav>
			<IconContainer>
				<AiOutlineUser />
				{click ? <Input placeholder="검색어를 입력하세요" /> : null}
				<AiOutlineSearch
					className={click ? 'search' : null}
					onClick={clickBtn}
				/>
				<AiOutlineShoppingCart />
			</IconContainer>
		</Nav>
	);
}
/* animation: ${listHover} 0.3s ease-in-out; */
/* animation: ${turn} 0.3s ease-in-out; */
/* animation: ${showSearchBar} 0.3s ease-in-out; */

const Nav = styled.nav`
	position: sticky;
	margin: 45px 40px 0 0;
	/* right: 40px; */
	/* margin-right: 40px; */
	width: 100px;
	top: 0px;
	display: flex;
	flex-direction: column;
	/* margin-top: 45px;
	margin-right: 40px; */
`;

const showSearchBar = keyframes`
	from{
		opacity: 0;
	}
	to{
		opacity: 100;
	}
`;

// const MyPageIcon = styled.div`
// 	position: relative;
// `;

const Box = styled.div`
	/* margin-right: 230px; */
	/* width: 248px; */
	/* height: 47.5px; */

	margin: 7px 0;
	display: flex;
	/* justify-content: flex-end; */
	align-items: center;
	/* stroke-width: 10;
	color: var(--green-100);
	font-size: 24px; */
	position: absolute;
	/* right: 270px; */
	/* top: 54px; */
	/* right: 5px; */
	svg {
		display: flex;
		align-items: center;
		position: absolute;
		border: none;
		background: none;
		stroke-width: 10;
		color: var(--green-100);
		font-size: 24px;
		cursor: pointer;
		/* z-index: 4; */
		left: 260px;
		z-index: 999;
	}
`;

const Input = styled.input`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid var(--green-100);
	background-color: white;
	border-radius: 50px;
	width: 284px;
	padding: 0 2;
	height: 40px;
	text-indent: 24px;
	position: absolute;
	right: -10px;
	top: 61px;
	:focus {
		outline: none;
	}
	::placeholder {
		color: var(--gray-300);
		/* text-align: center; */
		text-indent: 24px;
		text-rendering: 24px;
	}
`;

// const Icon = styled.button`
// 	display: flex;
// 	align-items: center;
// 	position: absolute;
// 	border: none;
// 	background: none;
// 	stroke-width: 10;
// 	color: var(--green-100);
// 	font-size: 24px;
// 	cursor: pointer;
// 	/* z-index: 4; */
// 	left: 240px;
// `;

const IconContainer = styled.li`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	-webkit-user-select: none;
	user-select: none;
	cursor: pointer;

	& > svg {
		margin: 15px 0;
		position: relative;
		font-size: 24px;

		:hover {
			* {
				color: var(--green-100);
			}
		}
	}

	.search {
		path {
			color: var(--green-100);
		}
	}

	path {
		color: var(--purple-200);
		stroke-width: 10;
		transition: color 0.1s;
	}
`;

const RouteContainer = styled.div`
	button {
		outline: none;
		background-color: none;
	}
`;

export default RightNav;
