import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

function Search() {
	return (
		<Box>
			<Input placeholder="검색어를 입력하세요" />
			<Icon>
				<BiSearch />
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
	background-color: var(--gray-200);
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
	color: var(--purple-200);
	font-size: 20px;
	left: 115px;
`;

export default Search;
