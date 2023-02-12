import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DefaultToggleTab from './DefaultToggleTab';

interface ToggleTabProps {
	currentIdx: number;
}

interface PeriodChoiceTabProps extends ToggleTabProps {
	onClick: React.MouseEventHandler<HTMLLIElement>;
}

interface PeriodChangeTabProps extends PeriodChoiceTabProps {
	orderId: number;
	itemOrderId: number;
}

export function OrderToggleTab({ currentIdx }: ToggleTabProps) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [path] = useState(pathname.slice(0, pathname.lastIndexOf('/')));

	const menu = {
		list: ['일반', '정기'],
		link: ['/normal', '/subscription'],
	};

	const handleToggleClick: React.MouseEventHandler<HTMLLIElement> = useCallback(
		(e) => {
			const { id } = e.target as HTMLLIElement;

			if (id === '1') {
				navigate(`${path}${menu.link[1]}`);
			} else if (id === '0') {
				navigate(`${path}${menu.link[0]}`);
			}
		},
		[],
	);

	return (
		<DefaultToggleTab
			currentIdx={currentIdx}
			onClick={handleToggleClick}
			menuArr={menu.list}
			purpose="order"
		/>
	);
}

export function NoteToggleTab({ currentIdx }: ToggleTabProps) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [path] = useState(pathname.slice(0, pathname.lastIndexOf('/')));

	const menu = {
		list: ['리뷰', '토크'],
		link: ['/review', '/talk'],
	};

	const handleToggleClick: React.MouseEventHandler<HTMLLIElement> = useCallback(
		(e) => {
			const { id } = e.target as HTMLLIElement;

			if (id === '1') {
				navigate(`${path}${menu.link[1]}`);
			} else if (id === '0') {
				navigate(`${path}${menu.link[0]}`);
			}
		},
		[],
	);

	return (
		<DefaultToggleTab
			currentIdx={currentIdx}
			onClick={handleToggleClick}
			menuArr={menu.list}
			purpose="note"
		/>
	);
}

// 마이페이지 - 정기구독 관리 시 주기 선택하는 탭
export function PeriodChangeTab({
	onClick,
	currentIdx,
	orderId,
	itemOrderId,
}: PeriodChangeTabProps) {
	const menuArr = ['30일', '60일', '90일', '120일'];

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

// 상세페이지 - 정기구독 구매 시 주기 선택하는 탭
export function PeriodChoiceTab({ onClick, currentIdx }: PeriodChoiceTabProps) {
	const menuArr = ['30일', '60일', '90일', '120일'];

	return (
		<DefaultToggleTab
			menuArr={menuArr}
			onClick={onClick}
			currentIdx={currentIdx}
			purpose="period-chioce"
		/>
	);
}
