import { useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { MYPAGE_TAB } from '../Etc/Constants';

export default function MypageTab() {
	const { pathname } = useLocation();
	const path = pathname.split('/')[2];
	const [seletedTab, setSeletedTab] = useState(MYPAGE_TAB.PATH.indexOf(path));

	useEffect(() => {
		// /normal, /subscription 세부 경로로 진입해도 order
		if (path === 'order') {
			setSeletedTab(1);

			// /review, /talk 세부 경로로 진입해도 note
		} else if (path === 'note') {
			setSeletedTab(4);
		}
	}, []);

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
	* {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
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
	${({ isSelected }) =>
		isSelected &&
		css`
			color: var(--gray-500);
			background-color: var(--gray-100);
		`}
`;
