import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
	AiOutlineUser,
	AiOutlineSearch,
	AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
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
			<RouteContainer>
				<Member>
					기현
					<button type="button">
						<Link to="signup">회원가입</Link>
					</button>
					<button type="button">
						<Link to="login">로그인</Link>
					</button>
					<button type="button">
						<Link to="/">메인</Link>
					</button>
					<button type="button">
						<Link to="mypage/note/review">리뷰관리</Link>
					</button>
					<button type="button">
						<Link to="mypage/note/talk">토크관리</Link>
					</button>
				</Member>
				<Member>
					현수
					<button type="button">
						<Link to="mypage/user-info">회원정보</Link>
					</button>
					<button type="button">
						<Link to="mypage/sub-manage">정기구독목록</Link>
					</button>
					<button type="button">
						<Link to="mypage/wish">위시리스트</Link>
					</button>
					<button type="button">
						<Link to="pay/normal">일반결제</Link>
					</button>
					<button type="button">
						<Link to="pay/subscription">정기결제</Link>
					</button>
				</Member>
				<Member>
					세연
					<button type="button">
						<Link to="mypage/order">주문내역</Link>
					</button>
					<button type="button">
						<Link to="mypage/order/1">주문내역상세</Link>
					</button>
					<button type="button">
						<Link to="detail/1">상세</Link>
					</button>
				</Member>
				<Member>
					지환
					<button type="button">
						<Link to="cart/normal">일반장바구니</Link>
					</button>
					<button type="button">
						<Link to="cart/subscription">정기장바구니</Link>
					</button>
					<button type="button">
						<Link to="list">목록</Link>
					</button>
					<button type="button">
						<Link to="search">검색목록</Link>
					</button>
				</Member>
			</RouteContainer>
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

// const Box = styled.div`
// 	/* margin-right: 230px; */
// 	/* width: 248px; */
// 	/* height: 47.5px; */

// 	margin: 7px 0;
// 	display: flex;
// 	/* justify-content: flex-end; */
// 	align-items: center;
// 	/* stroke-width: 10;
// 	color: var(--green-100);
// 	font-size: 24px; */
// 	position: absolute;
// 	/* right: 270px; */
// 	/* top: 54px; */
// 	/* right: 5px; */
// 	svg {
// 		display: flex;
// 		align-items: center;
// 		position: absolute;
// 		border: none;
// 		background: none;
// 		stroke-width: 10;
// 		color: var(--green-100);
// 		font-size: 24px;
// 		cursor: pointer;
// 		/* z-index: 4; */
// 		left: 260px;
// 		z-index: 999;
// 	}
// `;

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
		text-indent: 24px;
		text-rendering: 24px;
	}
`;

const IconContainer = styled.li`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	-webkit-user-select: none;
	user-select: none;

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
		/* cursor: pointer; */
		color: var(--purple-200);
		stroke-width: 10;
		transition: color 0.1s;
	}
`;

const RouteContainer = styled.div`
	button {
		cursor: pointer;
		outline: none;
		border: 1px solid;
		background: none;
		width: 85px;
		margin: 2px;
		a {
			width: 100%;
		}
	}
`;

const Member = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 30px 0;
	font-size: 16px;
`;

export default RightNav;
