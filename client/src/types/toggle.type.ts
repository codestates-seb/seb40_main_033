// DefaultToggleTab
export interface DefaultTabProps {
	menuArr: string[];
	currentIdx: number;
	purpose: string;
	onClick: React.MouseEventHandler<HTMLLIElement>;
	orderId?: number;
	itemOrderId?: number;
}

export interface ToggleStyleProps {
	isTwoButton: boolean;
}

export interface HighlightProps extends ToggleStyleProps {
	left: number;
	width: number;
}

// ToggleTabs
export interface ToggleTabProps {
	currentIdx: number;
}

export interface PeriodChoiceTabProps extends ToggleTabProps {
	onClick: React.MouseEventHandler<HTMLLIElement>;
}

export interface PeriodChangeTabProps extends PeriodChoiceTabProps {
	orderId: number;
	itemOrderId: number;
}
