import React, { useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { usePatch } from '../../hooks/useFetch';

interface DefaultTabProps {
	menuArr: {
		name: string;
		index: number;
	}[];
	toggle?: boolean;
	fontSize?: string; // 기본값 16
	currentIdx: number;
	purpose: string;
	order?: boolean;
	note?: boolean;
	onClick?: React.MouseEventHandler<HTMLElement>;
	orderId?: number;
	itemOrderId?: number;
}

interface Toggle {
	toggle?: boolean;
}

interface HighlightProps extends Toggle {
	left: number;
	width: number;
}

// currentIdx ==> 지금 선택한 탭의 index
// highlightValue ==> 지금 선택한 탭의 left 위치 (0번째: 0, 1번째: 68, 2번째: 136 ... => 68씩 증가!)
function DefaultTabButton({
	menuArr,
	toggle,
	fontSize = '16px',
	currentIdx,
	purpose,
	order,
	note,
	onClick,
	orderId,
	itemOrderId,
}: DefaultTabProps) {
	const { mutate: postponeSub } = usePatch(
		`/schedule/delay?orderId=${orderId}&delay=7&itemOrderId=${itemOrderId}`,
	);
	const menuEl = useRef<HTMLUListElement>(null);
	const { pathname } = useLocation();
	const [currentTab, setCurrentTab] = useState(currentIdx);

	const isTwoButton = ['order', 'note'].includes(purpose);
	const highlightValue = isTwoButton ? 68 : 73;

	const [highlight, setHighlight] = useState({
		left: currentTab * highlightValue,
		width: currentTab === 3 ? 82 : highlightValue,
	});

	const navigate = useNavigate();

	const splitedPath = pathname.split('/');
	// /normal, /subscription을 제외한 path
	const joinPath = splitedPath.slice(0, splitedPath.length - 1).join('/');

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

			if (onClick) {
				onClick(e);
			}

			// 일반/정기 토글 클릭 시 해당 페이지의 일반/정기 페이지로 이동
			if (order) {
				if (index === 1) {
					navigate(`${joinPath}/subscription`);
				} else if (index === 0) {
					navigate(`${joinPath}/normal`);
				}
			}

			// 리뷰/토크 토글 클릭 시 해당 페이지의 리뷰/토크 페이지로 이동
			if (note) {
				if (index === 1) {
					navigate(`${joinPath}/talk`);
				} else if (index === 0) {
					navigate(`${joinPath}/review`);
				}
			}
		},
		[highlight],
	);

	const delayButtonClick: React.MouseEventHandler<HTMLLIElement> =
		useCallback(() => {
			postponeSub();
			toast.success('주기를 미뤘습니다!');
		}, []);

	return (
		<TabContainer toggle={toggle}>
			<Highlight
				left={highlight.left}
				width={highlight.width}
				toggle={toggle}
			/>
			<TabMenu ref={menuEl} fontSize={fontSize}>
				{menuArr.map(({ name, index }) => (
					<li
						key={`${index}-${name}`}
						id={`${index}`}
						className={currentTab === index ? 'submenu focused' : 'submenu'}
						onClick={handleBtnClick}
						role="presentation"
					>
						{name}
					</li>
				))}
				{purpose === 'period-change' && (
					<li className="delay" onClick={delayButtonClick} role="none">
						미루기
					</li>
				)}
			</TabMenu>
		</TabContainer>
	);
}

export default React.memo(DefaultTabButton);

const TabContainer = styled.div<Toggle>`
	background-color: ${({ toggle }) => (toggle ? 'white' : 'var(--gray-100)')};
	position: relative;
	width: fit-content;
	padding-left: 8px;
	padding-right: 8px;
	box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.07);
	border-radius: 50px;
`;

const TabMenu = styled.ul<{ fontSize: string }>`
	display: flex;
	justify-items: center;
	align-items: center;
	list-style: none;
	cursor: pointer;
	position: relative;

	.submenu {
		font-size: ${(props) => props.fontSize};
		color: var(--gray-300);
		text-align: center;
		padding: 20px 20px;
		cursor: pointer;
		transition: all 0.4s ease-in-out;
	}

	.focused {
		color: var(--gray-500);
		transition: all 0.4s ease-in-out;
	}

	.red {
		color: var(--red-100);
	}

	.open {
		box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.07);
		background: white;
		border-radius: 50px;
		padding: 14px 20px;
	}
`;

const Highlight = styled.span<HighlightProps>`
	background: ${({ toggle }) => (toggle ? 'var(--gray-100)' : 'white')};
	position: absolute;
	width: ${(props) => props.width}px;
	top: 6px;
	bottom: 6px;
	transition: 0.4s cubic-bezier(0.65, 0, 0.35, 1);
	left: ${(props) => props.left + 8}px;
	border-radius: 50px;
	box-shadow: ${({ toggle }) => (toggle ? 'inset' : '')} 0px 1px 8px
		rgba(0, 0, 0, 0.07);
`;
