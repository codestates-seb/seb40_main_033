// 마이페이지
// 여기로오면 mypage/user로 보내세요
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MypageTab from '../components/Tabs/MypageTab';
import MyPageHeader from '../components/Etc/MyPageHeader';
import { ToggleTab } from '../components/Tabs/TabButtons';

const togglePath = ['/mypage/order/normal', '/mypage/order/subscription'];
const leftValueArr = [0, 68];

function MyPage() {
	const { pathname } = useLocation();
	const currentIdx = togglePath.indexOf(pathname);
	const highlightLeftValue = leftValueArr[currentIdx];
	// 일반/정기 토글이 주문내역에서만 보이도록
	const show = pathname.includes('/order');

	return (
		<Container>
			<MyPageHeader />
			<MypageTab />
			{show && (
				<ToggleTab
					currentIdx={currentIdx}
					highlightLeftValue={highlightLeftValue}
				/>
			)}
			<Outlet />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

export default MyPage;
