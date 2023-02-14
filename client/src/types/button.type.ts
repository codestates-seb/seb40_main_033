import { ReactNode } from 'react';

export interface DefaultButtonProps {
	color?: string;
	colorCode?: string;
	borderCode?: string;
	bgColor?: string;
	bgCode?: string;
	hoverBgCode?: string;
	width?: string;
	height?: string;
	borderRadius?: string;
	hoverColor?: string;
	hoverColorCode?: string;
	fontSize?: string;
	fontWeight?: string;
	disable?: boolean;
	none?: boolean;
	letter?: boolean;
	children: ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	black?: boolean;
}

export interface CounterBtnProps {
	quantity: number;
	onPlusClick: () => void;
	onMinusClick: () => void;
}

export interface PriceButtonProps {
	min: number;
	max: number;
	isOpen?: boolean;
}

export interface WishlistBtnProps {
	isChecked: boolean;
	itemId: number;
	setIsChecked: (isChecked: number) => void;
}
