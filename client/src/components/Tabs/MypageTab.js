import { useState } from 'react';
import styled, { css } from 'styled-components';

const TabName = [
	'회원정보 수정',
	'주문내역 조회',
	'정기구독 관리',
	'위시리스트',
	'작성글 관리',
];

export default function MypageTab() {
	const [seletedTab, setSeletedTab] = useState(0);

	return (
		<Tab>
			{TabName.map((name, index) => (
				<TabItem
					key={`${index.toString()}-${name}`}
					onClick={() => setSeletedTab(index)}
					isSelected={seletedTab === index}
				>
					{/* span -> link 변경 예정 */}
					<span>{name}</span>
				</TabItem>
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
`;

const TabItem = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	/* margin-top: 10px; */
	width: 140px;
	height: 100%;
	background-color: #fff;
	border-radius: 5px 5px 0 0;
	cursor: pointer;
	& > * {
		color: var(--gray-300);
		font-weight: var(--bold);
		font-size: 16px;
	}
	${(props) =>
		props.isSelected &&
		css`
			& > * {
				color: var(--gray-500);
			}
			background-color: var(--gray-100);
		`}
`;
