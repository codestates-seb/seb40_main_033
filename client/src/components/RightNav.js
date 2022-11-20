import { useState } from 'react';
import styled from 'styled-components';
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
				{click ? (
					<Box>
						<Input placeholder="검색어를 입력하세요" />
						<Icon>
							<AiOutlineSearch onClick={clickBtn} />
						</Icon>
					</Box>
				) : (
					<AiOutlineSearch onClick={clickBtn} />
				)}
				<AiOutlineShoppingCart />
			</IconContainer>
		</Nav>
	);
}

const Nav = styled.nav`
	display: flex;
	flex-direction: column;
	margin-top: 45px;
	margin-right: 40px;
`;

const Box = styled.div`
	margin-right: 230px;
	width: 248px;
	height: 47.5px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	border: 1px solid var(--green-100);
	background-color: white;
	border-radius: 50px;
	position: absolute;
	width: 284px;
	height: 40px;
	text-indent: 24px;
	:focus {
		outline: none;
	}
	::placeholder {
		text-indent: 24px;
		text-rendering: 24px;
	}
`;

const Icon = styled.button`
	display: flex;
	align-items: center;
	position: relative;
	background-color: white;
	border: none;
	color: var(--green-100);
	font-size: 24px;
	left: 115px;
	cursor: pointer;
`;

const IconContainer = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	-webkit-user-select: none;
	user-select: none;
	cursor: pointer;

	& > svg {
		margin: 15px 0;
		position: relative;
		animation: ${listHover} 0.3s ease-in-out;
		font-size: 24px;

		path {
			color: var(--purple-200);
			stroke-width: 10;
			transition: color 0.1s;
		}

		:hover {
			animation: ${turn} 0.3s ease-in-out;
			* {
				color: var(--green-100);
			}
		}
	}
`;

export default RightNav;
