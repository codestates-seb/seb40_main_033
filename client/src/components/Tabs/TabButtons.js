import DefaultTabButton from './DefaultTabButton';

export function DayControlTab() {
	const menuArr = [
		{ name: '30일', index: 0 },
		{ name: '60일', index: 1 },
		{ name: '90일', index: 2 },
		{ name: '120일', index: 3 },
	];

	return <DefaultTabButton menuArr={menuArr} delayButton />;
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

export function DayShowTab({ fonSize }) {
	const menuArr = [
		{ name: '30일', index: 0 },
		{ name: '60일', index: 1 },
		{ name: '90일', index: 2 },
		{ name: '120일', index: 3 },
	];

	return <DefaultTabButton menuArr={menuArr} fontSize={fonSize} />;
}
