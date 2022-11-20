import styled from 'styled-components';
import {
	AiOutlineUser,
	AiOutlineSearch,
	AiOutlineShoppingCart,
} from 'react-icons/ai';
import { turn, listHover } from './LeftNav';

function RightNav() {
	return (
		<Nav>
			<IconContainer>
				<AiOutlineUser />
				<AiOutlineSearch />
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
