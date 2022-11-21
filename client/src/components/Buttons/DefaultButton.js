import styled, { css } from 'styled-components';

const DefaultButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.3s all;
	font-size: 16px;
	font-weight: var(--bold);
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
	}) => css`
		-webkit-user-select: none; // 글씨 드래그 방지
		border: 0.5px solid ${`var(--${color}-${borderCode})`};
		border-radius: ${borderRadius};
		color: ${`var(--${color}-${colorCode})`};
		background-color: ${`var(--${color}-${bgCode})`};
		width: ${width};
		height: ${height};
		font-size: ${fontSize};
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
	`}
`;
export default DefaultButton;
