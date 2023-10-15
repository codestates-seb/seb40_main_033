import { useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Search from '../Search/Search';

function RightNav() {
	const accessToken = localStorage.getItem('accessToken');

	const handleScroll = useCallback(() => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	return (
		<Container>
			<Nav>
				<IconContainer>
					<Link to={accessToken ? '/mypage/user-info' : '/login'}>
						<AiOutlineUser />
					</Link>
					<Search rightNav />
					<Link to={accessToken ? '/cart/normal' : '/login'}>
						<AiOutlineShoppingCart />
					</Link>
				</IconContainer>
			</Nav>
			<ScrollTop onClick={handleScroll}>
				<IoIosArrowBack />
			</ScrollTop>
		</Container>
	);
}

const Container = styled.div`
	position: relative;
	z-index: 999;
`;

const Nav = styled.nav`
	position: sticky;
	top: 45px;
	margin: 45px 40px 0 0;
	width: 100px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	.temp-btn {
		font-size: 16px;
		margin-top: 30px;
		border: none;
		background: none;
	}
`;

const IconContainer = styled.li`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	-webkit-user-select: none;
	user-select: none;
	position: relative;

	// search 위치 조절
	> :nth-child(2) {
		top: 65px;
	}

	& > a {
		margin: 16px 0 73px 0;
	}

	// 유저, 카트 아이콘
	& > * svg {
		cursor: pointer;
		font-size: 24px;

		:hover {
			* {
				color: var(--green-100);
			}
		}
	}

	path {
		color: var(--purple-200);
		stroke-width: 10;
		transition: color 0.1s;
	}

	* input {
		right: -10px;
	}
`;

// scroll top 버튼
const ScrollTop = styled.button`
	position: fixed;
	bottom: 40px;
	right: 35px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 1px solid #f1f0fe;
	background-color: white;
	cursor: pointer;
	z-index: 999;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
	transform: rotate(90deg);

	& > svg {
		path {
			color: var(--purple-200);
		}
		width: 20px;
		height: 20px;
		position: absolute;
		top: 23%;
		left: 22%;
	}
`;

export default RightNav;
