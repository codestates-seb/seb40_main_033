import DefaultButton from './DefaultButton';

export function PurpleButton({
	children,
	width,
	height,
	onClick,
	borderRadius = '6px',
	fontSize,
	fontWeight = 'bold',
	disable,
}) {
	return (
		<DefaultButton
			color="purple"
			colorCode="100"
			bgCode="200"
			hoverBgCode="h200"
			width={width}
			height={height}
			onClick={onClick}
			borderRadius={borderRadius}
			fontSize={fontSize}
			fontWeight={fontWeight}
			// 비활성화
			disable={disable}
		>
			{children}
		</DefaultButton>
	);
}

export function LightPurpleButton({
	children,
	width,
	height,
	onClick,
	borderRadius = '6px',
	fontSize,
	fontWeight,
}) {
	return (
		<DefaultButton
			onClick={onClick}
			color="purple"
			colorCode="300"
			borderCode="300"
			bgCode="100"
			hoverBgCode="h100"
			width={width}
			height={height}
			borderRadius={borderRadius}
			fontSize={fontSize}
			fontWeight={fontWeight}
		>
			{children}
		</DefaultButton>
	);
}

export function ColoredButton({
	children,
	width,
	height,
	onClick,
	borderRadius = '100px',
	bgColor = '#6256e5',
}) {
	return (
		<DefaultButton
			onClick={onClick}
			color="gray"
			colorCode="100"
			bgColor={bgColor}
			bgCode="100"
			width={width}
			height={height}
			borderRadius={borderRadius}
			fontSize="13px"
			none
		>
			{children}
		</DefaultButton>
	);
}
