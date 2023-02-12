import { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { MYPAGE_TAB } from '../Etc/Constants';

export default function MypageTab() {
	const { pathname } = useLocation();
	const splitedPathname = pathname.split('/mypage/');
	let pathIdx;

	// order가 포함되면 pathIdx는 무조건 1
	if (pathname.includes('order')) {
		pathIdx = 1;
		// note가 포함되면 pathIdx는 무조건 4
	} else if (pathname.includes('note')) {
		pathIdx = 4;
	} else {
		pathIdx = MYPAGE_TAB.PATH.indexOf(splitedPathname[1]);
	}

	const [seletedTab, setSeletedTab] = useState(pathIdx === -1 ? 0 : pathIdx);

	const handleTabClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
		(e) => {
			const { id } = e.target as HTMLDivElement;
			setSeletedTab(Number(id));
		},
		[],
	);

	return (
		<Tab>
			{MYPAGE_TAB.NAME.map((name, i) => (
				<Link to={MYPAGE_TAB.PATH[i]} key={`${i.toString()}-${name}`}>
					<TabItem
						id={`${i}`}
						onClick={handleTabClick}
						isSelected={seletedTab === i}
					>
						{name}
					</TabItem>
				</Link>
			))}
		</Tab>
	);
}

const Tab = styled.nav`
	max-width: 1000px;
	width: 100%;
	height: 57px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	background-color: #fff;
	margin: 5px 0 40px 0;
	/* margin-bottom: 40px; */

	* {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		/* width: 140px; */
		height: inherit;
		background-color: #fff;
		border-radius: 5px 5px 0 0;
		cursor: pointer;
	}
`;

const TabItem = styled.div<{ isSelected: boolean }>`
	color: var(--gray-300);
	font-weight: var(--bold);
	font-size: 16px;
	/* & > * {
	} */
	${(isSelected) =>
		isSelected &&
		css`
			color: var(--gray-500);
			background-color: var(--gray-100);
		`}
`;
