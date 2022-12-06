import styled from 'styled-components';
import { useCallback, useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function Search() {
	const [click, setClick] = useState(false);
	const navigate = useNavigate();
	const searchRef = useRef();

	const handleSearch = useCallback(async (e) => {
		if (e.key === 'Enter') {
			navigate(`/search?keyword=${e.target.value.replaceAll(' ', '_')}`);
		}
	}, []);

	const handleclickSearch = useCallback(() => {
		setClick(true);
	}, [click]);

	const clickOutside = (e) => {
		if (!searchRef.current.contains(e.target)) {
			setClick(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', clickOutside);

		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	});

	return (
		<Box ref={searchRef}>
			<Input
				placeholder="검색어를 입력하세요"
				className={click ? 'search' : null}
				onClick={handleclickSearch}
				onKeyDown={handleSearch}
			/>
			<Icon>
				<AiOutlineSearch className={click ? 'search' : null} />
			</Icon>
		</Box>
	);
}

const Box = styled.div`
	width: 284px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	border: 1px solid var(--purple-200);
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
	}

	&.search {
		border: none;
		outline: 2px solid var(--green-100);
		height: 38px;
		width: 282px;
	}
`;

const Icon = styled.button`
	display: flex;
	align-items: flex-end;
	background: none;
	border: none;

	svg {
		cursor: pointer;
		margin: 15px 0;
		position: relative;
		font-size: 24px;
		left: 110px;

		&.search {
			path {
				color: var(--green-100);
			}
		}
	}

	path {
		color: var(--purple-200);
	}
`;

export default Search;
