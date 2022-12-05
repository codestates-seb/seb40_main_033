import DefaultTabButton from './DefaultTabButton';

export function DayControlTab({ onClick, currentIdx, orderId, itemOrderId }) {
	const menuArr = [
		{ name: '30일', index: 0 },
		{ name: '60일', index: 1 },
		{ name: '90일', index: 2 },
		{ name: '120일', index: 3 },
	];
	// highlightValue ==> 지금 선택한 탭의 left 위치 (0번째: 0, 1번째: 68, 2번째: 136 ... => 68씩 증가!)
	const highlightValue = 73 * currentIdx;

	return (
		<DefaultTabButton
			delayButton
			menuArr={menuArr}
			onClick={onClick}
			currentIdx={currentIdx}
			highlightLeftValue={highlightValue}
			orderId={orderId}
			itemOrderId={itemOrderId}
		/>
	);
}

export function ToggleTab({ currentIdx, highlightLeftValue }) {
	const menuArr = [
		{ name: '일반', index: 0 },
		{ name: '정기', index: 1 },
	];

	return (
		<DefaultTabButton
			currentIdx={currentIdx}
			highlightLeftValue={highlightLeftValue}
			menuArr={menuArr}
			toggle
			order
		/>
	);
}

export function NoteToggleTab({ currentIdx, highlightLeftValue }) {
	const menuArr = [
		{ name: '리뷰', index: 0 },
		{ name: '토크', index: 1 },
	];

	return (
		<DefaultTabButton
			currentIdx={currentIdx}
			highlightLeftValue={highlightLeftValue}
			menuArr={menuArr}
			toggle
			note
		/>
	);
}

export function DayShowTab({ fonSize, onClick, currentIdx }) {
	const menuArr = [
		{ name: '30일', index: 0 },
		{ name: '60일', index: 1 },
		{ name: '90일', index: 2 },
		{ name: '120일', index: 3 },
	];

	// highlightValue ==> 지금 선택한 탭의 left 위치 (0번째: 0, 1번째: 68, 2번째: 136 ... => 68씩 증가!)
	const highlightValue = 73 * currentIdx;

	return (
		<DefaultTabButton
			menuArr={menuArr}
			fontSize={fonSize}
			onClick={onClick}
			currentIdx={currentIdx}
			highlightLeftValue={highlightValue}
		/>
	);
}
