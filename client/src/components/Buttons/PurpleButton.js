import DefaultButton from './DefaultButton';

export function PurpleButton({
	children,
	width,
	height,
	onClick,
	borderRadius = '6px',
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
		>
			{children}
		</DefaultButton>
	);
}
