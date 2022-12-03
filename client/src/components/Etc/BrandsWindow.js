import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { setBrand } from '../../redux/slice/filterSlice';

function BrandsWindow() {
	const dispatch = useDispatch();
	const { brand } = useSelector((state) => state.filter);

	const brandList = [
		{
			name: '',
			text: '전체 +',
		},
		{
			name: 'Roniewell',
			text: 'Roniewell',
		},
		{
			name: 'NaturalLife',
			text: 'NaturalLife',
		},
		{
			name: 'MYNI',
			text: 'MYNI',
		},
		{
			name: 'Centrum',
			text: 'Centrum',
		},
		{
			name: 'Habitual',
			text: 'Habitual',
		},
		{
			name: 'GNM',
			text: 'GNM',
		},
		{
			name: 'nzOrigin',
			text: 'nzOrigin',
		},
		{
			name: 'FarmAndTop',
			text: 'FarmAndTop',
		},
		{
			name: 'NutrioneLife',
			text: 'NutrioneLife',
		},
		{
			name: 'SOLGAR',
			text: 'SOLGAR',
		},
	];

	return (
		<WindowContainer>
			{brandList.map((c) => (
				<BrandList
					key={c.name}
					active={brand === c.name}
					onClick={() => dispatch(setBrand(c.name))}
				>
					{c.text}
				</BrandList>
			))}
		</WindowContainer>
	);
}

const WindowContainer = styled.div`
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

export default BrandsWindow;
