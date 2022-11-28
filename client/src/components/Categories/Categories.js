import styled, { css } from 'styled-components';

function Categories({ category, onSelect }) {
	const categoryList = [
		{
			name: 'All',
			text: '전체 +',
		},
		{
			name: 'BRAND2',
			text: 'BRAND2',
		},
		{
			name: '33RAND',
			text: '33RAND',
		},
	];
	return (
		<Category>
			{categoryList.map((c) => (
				<BrandList
					key={c.name}
					active={category === c.name}
					onClick={() => onSelect(c.name)}
				>
					{c.text}
				</BrandList>
			))}
		</Category>
	);
}

const Category = styled.div`
	margin-left: 30px;
	width: 1050px;
	height: 100px;
	display: flex;
	flex-wrap: wrap;
`;

const BrandList = styled.div`
	margin-right: 30px;
	font-size: 14px;
	font-weight: var(--bold);
	color: var(--gray-400);
	display: flex;
	align-items: center;
	cursor: pointer;

	&:hover {
		color: black;
	}
	${(props) =>
		props.active &&
		css`
			font-weight: var(--bold);
			color: #22b8cf;
			&:hover {
				color: #3bc9db;
			}
		`}
`;

export default Categories;
