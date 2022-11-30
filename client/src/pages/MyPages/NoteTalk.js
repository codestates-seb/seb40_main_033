import DetailTalkList from '../../components/Lists/DetailTalkList';
import SubManagementList from '../../components/Lists/MyPageLists/SubManagementList';
import Talk from '../../components/Talk/Talk';
import Comment from '../../components/Talk/Comment';

// 작성글 관리 - 토크
function NoteTalk() {
	return (
		<>
			<Talk />
			<Comment />
			<DetailTalkList />
			<DetailTalkList isReply />
			<SubManagementList />
		</>
	);
}

export default NoteTalk;
