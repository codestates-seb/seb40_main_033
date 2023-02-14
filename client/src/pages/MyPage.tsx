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
import { OrderToggleTab, NoteToggleTab } from '../components/Tabs/ToggleTabs';

function MyPage() {
	const { id } = useParams();
	const { pathname } = useLocation();
	const isMypage = useMatch('/mypage');
	const navigate = useNavigate();

	const togglePath = pathname.includes('note')
		? ['/mypage/note/review', '/mypage/note/talk']
		: ['/mypage/order/normal', '/mypage/order/subscription'];

	const currentIdx = togglePath.indexOf(pathname); // ToggleTab 초기값

	// 토글이 주문내역 페이지와 작성글 관리에서만 보이도록
	const showOrderToggle = pathname.includes('/order') && !id;
	const showNoteToggle = pathname.includes('/note') && !id;

	useEffect(() => {
		// /mypage 로 접근 시, /mypage/user-info로 이동
		if (isMypage) {
			navigate('/mypage/user-info', { replace: true });
		}
	}, []);

	return (
		<Container>
			<MyPageHeader />
			<MypageTab />
			{showOrderToggle && <OrderToggleTab currentIdx={currentIdx} />}
			{showNoteToggle && <NoteToggleTab currentIdx={currentIdx} />}
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
