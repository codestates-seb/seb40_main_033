import styled, { css } from 'styled-components';

const DefaultButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.3s all;
	font-size: 16px;
	width: 150px;
	height: 35px;
	cursor: pointer;
	${({
		color,
		colorCode,
		borderCode,
		bgColor,
		bgCode,
		hoverBgCode,
		width,
		height,
		borderRadius,
		hoverColor,
		hoverColorCode,
		fontSize,
		fontWeight,
		disable,
	}) => css`
		-webkit-user-select: none; // 글씨 드래그 방지
		border: 0.5px solid ${`var(--${color}-${borderCode})`};
		border-radius: ${borderRadius};
		color: ${`var(--${color}-${colorCode})`};
		background-color: ${`var(--${color}-${bgCode})`};
		width: ${width};
		height: ${height};
		font-size: ${fontSize};
		font-weight: ${`var(--${fontWeight})`};
		${(props) =>
			!props.letter
				? css`
						&:hover {
							background-color: ${`var(--${color}-${hoverBgCode})`};
							font-weight: var(--extraBold);
						}
				  `
				: css`
						height: fit-content;
						width: fit-content;
						&:hover {
							color: ${`var(--${hoverColor}-${hoverColorCode})`};
						}
				  `}
		${({ none }) =>
			none &&
			css`
				background-color: ${bgColor};
				border: none;
				&:hover {
					background-color: ${bgColor};
					font-weight: var(--bold);
				}
			`}
		${disable &&
		css`
			opacity: 0.5;
			cursor: not-allowed;
			background-color: var(--gray-200);
			&:hover {
				background-color: var(--gray-200);
				font-weight: var(--regular);
			}
		`}
	`}
`;
export default DefaultButton;
