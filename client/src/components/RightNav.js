import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
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
						<Wrap>
							<Input placeholder="검색어를 입력하세요" />
							<Icon>
								<AiOutlineSearch onClick={clickBtn} />
							</Icon>
						</Wrap>
					</Box>
				) : (
					<AiOutlineSearch onClick={clickBtn} />
				)}
				<AiOutlineShoppingCart />
			</IconContainer>
		</Nav>
	);
}

const move = keyframes`
0%{	
		opacity: 0;
    }
100%{
    opacity: 1;
    }
`;

const Nav = styled.nav`
	display: flex;
	flex-direction: column;
	margin-top: 45px;
	margin-right: 40px;
`;

const Box = styled.div`
	margin-right: 450px;
	height: 54px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Wrap = styled.div`
	animation: ${move} 1s 0s 1;
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
	position: relative;
	background-color: white;
	border: none;
	color: var(--green-100);
	font-size: 24px;
	left: 228px;
	top: 8px;
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

// @keyframes slide {
//   from {
//     transform: translateX(-100%);
//   }
//   to {
//     transform: translateX(0%);
//   }
// }

export default RightNav;
