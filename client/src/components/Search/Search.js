import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { setKeyword } from '../../redux/slice/filterSlice';

function Search({ refetch }) {
	const [click, setClick] = useState(false);
	const dispatch = useDispatch();

	const handleSearch = useCallback(async (e) => {
		if (e.key === 'Enter') {
			await dispatch(setKeyword(e.target.value));
			refetch();
		}
	}, []);

	const clickBtn = () => {
		setClick(!click);
	};

	const { key } = useSelector((store) => store.filter);
	console.log('key', key);

	return (
		<Box>
			<Input
				placeholder="검색어를 입력하세요"
				className={click ? 'search' : null}
				onClick={clickBtn}
				onKeyDown={handleSearch}
			/>
			<Icon>
				<AiOutlineSearch />
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
		outline-color: var(--green-100);
	}
	::placeholder {
		text-indent: 24px;
	}
`;

const Icon = styled.button`
	display: flex;
	align-items: flex-end;
	background: none;
	border: none;

	& > svg {
		cursor: pointer;
		margin: 15px 0;
		position: relative;
		font-size: 24px;
		color: var(--purple-200);
		left: 110px;
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

export default Search;
