import { useCallback, useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
	AiOutlineUser,
	AiOutlineSearch,
	AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function RightNav() {
	const accessToken = localStorage.getItem('accessToken');
	const [openSearch, setOpenSearch] = useState(false);
	const navigate = useNavigate();
	const modalRef = useRef();

	// 검색창 오픈
	const handleSearchOpen = useCallback(() => {
		setOpenSearch(!openSearch);
	}, [openSearch]);

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

	const handleScroll = useCallback(() => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	const clickModalOutside = (e) => {
		if (!modalRef.current.contains(e.target)) {
			setOpenSearch(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', clickModalOutside);

		return () => {
			document.removeEventListener('mousedown', clickModalOutside);
		};
	});

	return (
		<Container>
			<Nav>
				<IconContainer>
					<Link to={accessToken ? '/mypage/user-info' : '/login'}>
						<AiOutlineUser />
					</Link>
					<SearchContainer ref={modalRef}>
						<AiOutlineSearch
							className={openSearch && 'search'}
							onClick={handleSearchOpen}
						/>
						{openSearch && (
							<SearchBar
								onKeyDown={handleSearch}
								placeholder="검색어 입력 후 엔터를 눌러주세요."
								autoFocus
							/>
						)}
					</SearchContainer>
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
	text-indent: 4px;

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

	path {
		color: var(--purple-200);
		stroke-width: 10;
		transition: color 0.1s;
	}
`;

const SearchContainer = styled.div`
	// 서치 아이콘
	svg {
		cursor: pointer;
		margin: 15px 0;
		font-size: 24px;
		position: relative;
		z-index: 1;

		:hover {
			* {
				color: var(--green-100);
			}
		}

		&.search {
			path {
				color: var(--green-100);
			}
		}
	}

	path {
		color: var(--purple-200);
		stroke-width: 10;
		transition: color 0.1s;
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
