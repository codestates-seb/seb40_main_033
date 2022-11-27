// 마이페이지
// 여기로오면 mypage/user로 보내세요
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MypageTab from '../components/Tabs/MypageTab';
import MyPageHeader from '../components/Etc/MyPageHeader';
import { ToggleTab } from '../components/Tabs/TabButtons';

function MyPage() {
	const { pathname } = useLocation();
	// 일반/정기 토글이 주문내역에서만 보이도록
	const show = pathname.includes('/order');
	return (
		<Container>
			<MyPageHeader />
			<MypageTab />
			{show && <ToggleTab />}
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
