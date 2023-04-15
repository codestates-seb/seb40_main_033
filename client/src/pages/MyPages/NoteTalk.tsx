import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import MypageTalk from '../../components/Lists/MyPageLists/MyPageTalkList';
// import Pagination from '../../components/Etc/Pagination';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';
import axiosInstance from '../../utils/axiosInstance';
import { NoteTalkData } from '../../types/note.type';
import { NO_TALKS_WRITTEN } from '../../assets/Constants';

// 작성글 관리 - 토크
function NoteTalk() {
	const { pathname } = useLocation();
	const { isLoading, isError, data, error } = useQuery<
		AxiosResponse<NoteTalkData>
	>([pathname], () => axiosInstance.get('/talks/mypage'));

	const talks = data?.data?.data;

	if (isLoading || !talks) return <LoadingSpinner />;
	if (isError && error instanceof Error) return <div>{error.message}</div>;
	return (
		<>
			<ListContainer>
				{talks.length === 0 ? (
					<div className="blank">{NO_TALKS_WRITTEN}</div>
				) : (
					talks.map((talk) => (
						<MypageTalk
							key={talk.talkId || `${talk.talkCommentId.toString()}-${talk}`}
							talk={talk}
							isReply={talk.reply}
						/>
					))
				)}
			</ListContainer>
			{/* <Pagination total="10" limit="8" /> */}
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

	.blank {
		height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
	}
`;

export default NoteTalk;
