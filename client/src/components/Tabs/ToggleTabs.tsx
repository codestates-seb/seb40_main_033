import DefaultToggleTab from './DefaultToggleTab';

interface ToggleTabProps {
	currentIdx: number;
}

interface PeriodChoiceTabProps {
	fontSize: string;
	onClick: React.MouseEventHandler<HTMLElement>;
	currentIdx: number;
}

interface PeriodChangeTabProps {
	onClick: React.MouseEventHandler<HTMLElement>;
	currentIdx: number;
	orderId: number;
	itemOrderId: number;
}

// 마이페이지 - 정기구독 관리 시 주기 선택하는 탭
export function PeriodChangeTab({
	onClick,
	currentIdx,
	orderId,
	itemOrderId,
}: PeriodChangeTabProps) {
	const menuArr = [
		{ name: '30일', index: 0 },
		{ name: '60일', index: 1 },
		{ name: '90일', index: 2 },
		{ name: '120일', index: 3 },
	];
	// highlightValue ==> 지금 선택한 탭의 left 위치 (0번째: 0, 1번째: 68, 2번째: 136 ... => 68씩 증가!)
	const highlightValue = 73 * currentIdx;

	return (
		<DefaultToggleTab
			menuArr={menuArr}
			onClick={onClick}
			currentIdx={currentIdx}
			orderId={orderId}
			itemOrderId={itemOrderId}
			purpose="period-change"
		/>
	);
}

export function OrderToggleTab({ currentIdx }: ToggleTabProps) {
	const menuArr = [
		{ name: '일반', index: 0 },
		{ name: '정기', index: 1 },
	];

	return (
		<DefaultToggleTab
			currentIdx={currentIdx}
			menuArr={menuArr}
			toggle
			order
			purpose="order"
		/>
	);
}

export function NoteToggleTab({ currentIdx }: ToggleTabProps) {
	const menuArr = [
		{ name: '리뷰', index: 0 },
		{ name: '토크', index: 1 },
	];

	return (
		<DefaultToggleTab
			currentIdx={currentIdx}
			menuArr={menuArr}
			toggle
			note
			purpose="note"
		/>
	);
}

// 상세페이지 - 정기구독 구매 시 주기 선택하는 탭
export function PeriodChoiceTab({
	fontSize,
	onClick,
	currentIdx,
}: PeriodChoiceTabProps) {
	const menuArr = [
		{ name: '30일', index: 0 },
		{ name: '60일', index: 1 },
		{ name: '90일', index: 2 },
		{ name: '120일', index: 3 },
	];

	// highlightValue ==> 지금 선택한 탭의 left 위치 (0번째: 0, 1번째: 68, 2번째: 136 ... => 68씩 증가!)
	const highlightValue = 73 * currentIdx;

	return (
		<DefaultToggleTab
			menuArr={menuArr}
			fontSize={fontSize}
			onClick={onClick}
			currentIdx={currentIdx}
			purpose="period-chioce"
		/>
	);
}
