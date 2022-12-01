import { useCallback, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
	AiOutlineUser,
	AiOutlineSearch,
	AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RightNav() {
	// const { accessToken } = store.getState().user;
	const { loginStatus } = useSelector((store) => store.user);
	const [openSearch, setOpenSearch] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	// 검색창 오픈
	const handleSearchOpen = useCallback(() => {
		setOpenSearch(!openSearch);
	}, [openSearch]);

	// 임시 페이지 이동 관련 함수
	const handleBtnOpen = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const handleSearch = useCallback((e) => {
		if (e.key === 'Enter') {
			if (e.target.value === '') {
				navigate('/search');
			} else {
				navigate(`/search?keyword=${e.target.value.replaceAll(' ', '_')}`);
			}
			setOpenSearch(false);
		}
	}, []);

	return (
		<Container>
			<Nav>
				<IconContainer>
					<Link to={loginStatus ? '/mypage' : '/login'}>
						<AiOutlineUser />
					</Link>
					<AiOutlineSearch
						className={openSearch && 'search'}
						onClick={handleSearchOpen}
					/>
					{openSearch && (
						<SearchBar
							onKeyDown={handleSearch}
							placeholder="검색어 입력 후 엔터를 눌러주세요."
						/>
					)}
					<Link to="/cart/normal">
						<AiOutlineShoppingCart />
					</Link>
				</IconContainer>
				<button className="temp-btn" type="button" onClick={handleBtnOpen}>
					🔵
				</button>
				{isOpen ? (
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
								<Link to="mypage/order/normal">주문내역</Link>
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
				) : null}
			</Nav>
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

const showSearchBar = keyframes`
	from{
		opacity: 0;
		width: 10px;
	}
	to{
		width: 250px;
	}
`;

const SearchBar = styled.input`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid var(--green-100);
	background-color: rgba(255, 255, 255, 0.7);
	border-radius: 50px;
	width: 250px;
	font-size: 14px;
	padding: 0 40px 0 20px;
	height: 40px;
	position: absolute;
	right: -12px;
	top: 66px;
	animation: ${showSearchBar} 0.25s ease-in-out;

	:focus {
		outline: 0.8px solid var(--green-100);
		background-color: white;
	}

	::placeholder {
		color: var(--gray-300);
		text-align: center;
		font-size: 12.5px;
	}
`;

const IconContainer = styled.li`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	-webkit-user-select: none;
	user-select: none;
	position: relative;

	// 유저, 카트 아이콘
	& > * svg {
		cursor: pointer;
		margin: 16px 0;
		font-size: 24px;

		:hover {
			* {
				color: var(--green-100);
			}
		}
	}

	// 서치 아이콘
	& > svg {
		cursor: pointer;
		margin: 15px 0;
		font-size: 24px;
		z-index: 1;

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
