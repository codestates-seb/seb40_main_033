// 마이페이지
// 여기로오면 mypage/user로 보내세요
import { Outlet } from 'react-router-dom';
import MypageTab from '../components/Tabs/MypageTab';

function MyPage() {
	return (
		<>
			<MypageTab />
			<h1>MyPage/</h1>
			<Outlet />
		</>
	);
}

export default MyPage;
