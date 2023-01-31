import DefaultButton, { DefaultButtonProps } from './DefaultButton';

export function LetterButton({
	children,
	width,
	height,
	onClick,
}: DefaultButtonProps) {
	return (
		<DefaultButton
			onClick={onClick}
			color="purple"
			colorCode="300"
			width={width}
			height={height}
			letter
			hoverColor="green"
			hoverColorCode="100"
			fontSize="13px"
		>
			{children}
		</DefaultButton>
	);
}

export function GrayLetterButton({
	children,
	width,
	height,
	onClick,
	fontSize = '11px',
}: DefaultButtonProps) {
	return (
		<DefaultButton
			onClick={onClick}
			color="gray"
			colorCode="300"
			width={width}
			height={height}
			hoverColor="gray"
			hoverColorCode="400"
			fontSize={fontSize}
			letter
		>
			{children}
		</DefaultButton>
	);
}

export function LetterButtonColor({
	children,
	width,
	height,
	onClick,
	color,
	colorCode,
	hoverColor,
	hoverColorCode,
	fontSize,
	fontWeight,
}: DefaultButtonProps) {
	return (
		<DefaultButton
			onClick={onClick}
			color={color}
			colorCode={colorCode}
			width={width}
			height={height}
			hoverColor={hoverColor}
			hoverColorCode={hoverColorCode}
			fontSize={fontSize}
			fontWeight={fontWeight}
			letter
		>
			{children}
		</DefaultButton>
	);
}
