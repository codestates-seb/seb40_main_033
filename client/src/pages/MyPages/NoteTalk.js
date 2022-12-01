import styled from 'styled-components';
import MypageTalk from '../../components/Talk/MyPageTalk';
import Pagination from '../../components/Etc/Pagination';

// 작성글 관리 - 토크
function NoteTalk() {
	return (
		<>
			<ListContainer>
				<MypageTalk content="Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit." />
				<MypageTalk
					isReply
					content="Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit. Rorem ipsum dolor sit amet, consectetur adipisicing elit."
				/>
			</ListContainer>
			<Pagination total="10" limit="8" />
		</>
	);
}

const ListContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4px;
	margin: 25px 0 75px 0;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	width: 872px;

	& > {
		:last-child {
			border: none;
		}
	}
`;

export default NoteTalk;
