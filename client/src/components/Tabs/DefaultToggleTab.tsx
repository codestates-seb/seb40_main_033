import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import {
	DefaultTabProps,
	ToggleStyleProps,
	HighlightProps,
} from '../../types/toggle.type';

// currentIdx ==> 지금 선택한 탭의 index
function DefaultToggleTab({
	menuArr,
	currentIdx,
	purpose,
	onClick,
	OnDelayClick,
}: DefaultTabProps) {
	const menuEl = useRef<HTMLUListElement>(null);
	const [currentTab, setCurrentTab] = useState(currentIdx);

	const isTwoButton = ['order', 'note'].includes(purpose);
	const highlightValue = isTwoButton ? 68 : 73;

	const [highlight, setHighlight] = useState({
		left: currentTab * highlightValue,
		width: currentTab === 3 ? 82 : highlightValue,
	});

	const handleBtnClick: React.MouseEventHandler<HTMLLIElement> = useCallback(
		(e) => {
			const { id } = e.target as HTMLLIElement;
			const index = Number(id);
			setCurrentTab(index);

			// 선택된 Tab Menu에 따라 하이라이트가 이동
			const left = (menuEl.current?.children[index] as HTMLElement).offsetLeft;
			const width = (menuEl.current?.children[index] as HTMLElement)
				.offsetWidth;

			setHighlight({
				left,
				width,
			});

			onClick(e);
		},
		[highlight],
	);

	return (
		<TabContainer isTwoButton={isTwoButton}>
			<Highlight
				left={highlight.left}
				width={highlight.width}
				isTwoButton={isTwoButton}
			/>
			<TabMenu ref={menuEl} purpose={purpose}>
				{menuArr.map((name, idx) => (
					<li
						key={`${idx.toString()}-${name}`}
						id={`${idx}`}
						className={currentTab === idx ? 'focused' : ''}
						onClick={handleBtnClick}
						role="none"
					>
						{name}
					</li>
				))}
				{purpose === 'period-change' && (
					<li className="delay" onClick={OnDelayClick} role="none">
						미루기
					</li>
				)}
			</TabMenu>
		</TabContainer>
	);
}

export default React.memo(DefaultToggleTab);

const TabContainer = styled.div<ToggleStyleProps>`
	background-color: ${({ isTwoButton }) =>
		isTwoButton ? 'white' : 'var(--gray-100)'};
	position: relative;
	width: fit-content;
	padding-left: 8px;
	padding-right: 8px;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.07);
	border-radius: 50px;
`;

const TabMenu = styled.ul<{ purpose: string }>`
	display: flex;
	justify-items: center;
	align-items: center;
	list-style: none;
	position: relative;
	li {
		white-space: nowrap;
		font-size: ${({ purpose }) =>
			purpose === 'period-chioce' ? '15px' : '16px'};
		color: var(--gray-300);
		text-align: center;
		padding: 20px;
		cursor: pointer;
		transition: all 0.4s ease-in-out;
	}
	.focused {
		color: var(--gray-500);
	}
	.delay {
		color: var(--red-100);
		:hover {
			box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.07);
			background: rgba(230, 0, 30, 0.09);
			border-radius: 50px;
			padding: 14px 20px;
		}
	}
`;

const Highlight = styled.span<HighlightProps>`
	background: ${({ isTwoButton }) =>
		isTwoButton ? 'var(--gray-100)' : 'white'};
	position: absolute;
	width: ${({ width }) => `${width}px`};
	top: 6px;
	bottom: 6px;
	transition: 0.4s cubic-bezier(0.65, 0, 0.35, 1);
	left: ${({ left }) => `${left + 8}px`};
	border-radius: 50px;
	box-shadow: ${({ isTwoButton }) => (isTwoButton ? 'inset' : '')} 0px 1px 8px
		rgba(0, 0, 0, 0.07);
`;
