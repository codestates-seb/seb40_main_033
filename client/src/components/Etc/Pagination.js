import { useState } from 'react';
import styled, { css } from 'styled-components';

function Pagination({ total, size, page, setPage }) {
	// total은 총 게시물의 개수
	// size 페이지 당 보여줄 게시물 수
	// page = 현재 페이지 번호
	const numPages = Math.ceil(total / size);
	const numbers = [];

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
	color: var(--gray-200);
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
						opacity: 0;
						transform: none;
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
