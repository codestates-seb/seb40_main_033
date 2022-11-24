import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const TabName = [
	'회원정보',
	'주문내역 조회',
	'정기구독 관리',
	'위시리스트',
	'작성글 관리',
];

const link = [
	'user-info',
	'order',
	'sub-manage',
	'wish',
	'note/review',
	'note/talk',
];

export default function MypageTab() {
	const [seletedTab, setSeletedTab] = useState(0);

	// const handleTabClick = (e) => {
	// 	console.log(e.target.id);
	// 	// setSeletedTab(index);
	// };

	return (
		<Tab>
			{TabName.map((name, index) => (
				<Link to={link[index]} key={`${index.toString()}-${name}`}>
					<TabItem
						onClick={() => setSeletedTab(index)}
						isSelected={seletedTab === index}
					>
						{/* span -> link 변경 예정 */}
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

const TabItem = styled.div`
	color: var(--gray-300);
	font-weight: var(--bold);
	font-size: 16px;
	/* & > * {
	} */
	${(props) =>
		props.isSelected &&
		css`
			color: var(--gray-500);
			background-color: var(--gray-100);
		`}
`;
