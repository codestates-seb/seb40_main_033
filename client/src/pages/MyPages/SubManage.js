import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';
import SubManagementList from '../../components/Lists/MyPageLists/SubManagementList';
import { useGet } from '../../hooks/useFetch';

function SubManage() {
	const { pathname } = useLocation();
	const { data, isError, isLoading, error } = useGet('/orders/subs', pathname);
	const subManageDatas = data?.data?.data;
	if (isLoading) return <LoadingSpinner />;
	if (isError) return <div>{error.message}</div>;
	return (
		<SubManageContainer>
			{subManageDatas.length === 0 ? (
				<div className="blank">정기구독 신청 내역이 없습니다.</div>
			) : (
				subManageDatas.map((subManageData, idx) => (
					<SubManagementList
						key={`${idx.toString()}-${subManageData}`}
						subManageData={subManageData}
					/>
				))
			)}
		</SubManageContainer>
	);
}

export default SubManage;

const SubManageContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4px;
	margin: 0 0 75px 0;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	width: 872px;

	& > {
		:last-child {
			border: none;
		}
		.blank {
			height: 200px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 16px;
		}
	}
`;
