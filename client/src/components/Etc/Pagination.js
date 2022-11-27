import { useState } from 'react';
import styled, { css } from 'styled-components';

function Pagination({ total, limit }) {
	// total은 총 게시물의 개수
	// limit 페이지 당 보여줄 게시물 수
	// page = 현재 페이지 번호
	const numPages = Math.ceil(total / limit); // 페이지의 갯수..근데 아마 이마저도 서버쪽에서 넘겨줄 듯?
	const numbers = [];
	const [page, setPage] = useState(1);
	for (let i = 1; i <= numPages; i += 1) {
		numbers.push(i);
	}

	return (
		<Nav>
			<Button
				type="button"
				onClick={() => setPage(page - 1)}
				disabled={page === 1}
				arrow
			>
				&lt;
			</Button>

			{numbers.map((num, i) => (
				<Button
					type="button"
					key={num - 1}
					onClick={() => setPage(i + 1)}
					value={num}
					disabled={page === num}
				>
					{i + 1}
				</Button>
			))}

			<Button
				type="button"
				onClick={() => setPage(page + 1)}
				disabled={page === numPages}
				arrow
			>
				&gt;
			</Button>
		</Nav>
	);
}
const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 28px;
	margin: 16px;
`;

const Button = styled.button`
	border: none;
	border-radius: 8px;
	padding: 8px;
	margin: 0;
	background-color: transparent;
	color: var(--gray-300);
	font-size: 20px;
	&:hover {
		cursor: pointer;
	}

	&[disabled] {
		cursor: revert;
		color: var(--gray-500);
		${(props) =>
			props.arrow
				? css`
						transform: none;
						color: var(--gray-300);
				  `
				: null}
	}
	${(props) =>
		props.arrow
			? css`
					color: var(--gray-500);
			  `
			: null}
`;

export default Pagination;
