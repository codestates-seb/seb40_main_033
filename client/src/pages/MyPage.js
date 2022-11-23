// 마이페이지
// 여기로오면 mypage/user로 보내세요
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MypageTab from '../components/Tabs/MypageTab';
import MyPageHeader from '../components/Etc/MyPageHeader';

function MyPage() {
	return (
		<Container>
			<MyPageHeader />
			<MypageTab />
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
