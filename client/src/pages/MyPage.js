import {
	Outlet,
	useLocation,
	useMatch,
	useNavigate,
	useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import MypageTab from '../components/Tabs/MypageTab';
import MyPageHeader from '../components/Etc/MyPageHeader';
import { ToggleTab, NoteToggleTab } from '../components/Tabs/TabButtons';

const togglePath = ['/mypage/order/normal', '/mypage/order/subscription'];
const togglePath2 = ['/mypage/note/review', '/mypage/note/talk'];
const leftValueArr = [0, 68];

function MyPage() {
	const { id } = useParams();
	const { pathname } = useLocation();
	const isMypage = useMatch('/mypage');
	const navigate = useNavigate();

	const currentIdx = togglePath.indexOf(pathname); // toggleTab 초기값
	const currentIdx2 = togglePath2.indexOf(pathname); // toggleTab 초기값
	const highlightLeftValue = leftValueArr[currentIdx]; // toggleTab 초기값
	const highlightLeftValue2 = leftValueArr[currentIdx2]; // toggleTab 초기값

	// 일반/정기 토글이 주문내역 페이지와 작성글 관리에서만 보이도록
	const show = pathname.includes('/order') && !id;
	const show2 = pathname.includes('/note') && !id;

	useEffect(() => {
		if (isMypage) {
			navigate('/mypage/user-info', { replace: true });
		}
	}, []);

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
			{show2 && (
				<NoteToggleTab
					currentIdx={currentIdx2}
					highlightLeftValue={highlightLeftValue2}
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
