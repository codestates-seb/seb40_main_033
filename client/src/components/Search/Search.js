import styled from 'styled-components';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function Search() {
	const [click, setClick] = useState(false);

	const clickBtn = () => {
		setClick(!click);
	};
	return (
		<Box>
			<Input
				placeholder="검색어를 입력하세요"
				className={click ? 'search' : null}
				onClick={clickBtn}
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
	align-items: center;
	position: relative;
	background-color: white;
	border: none;
	left: 110px;

	& > svg {
		position: relative;
		font-size: 24px;
	}
	.search {
		path {
			color: var(--green-100);
		}
	}

	path {
		/* cursor: pointer; */
		color: var(--purple-200);
	}
`;

export default Search;
