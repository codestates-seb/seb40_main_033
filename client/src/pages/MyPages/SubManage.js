// 정기구독관리
import { useLocation, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SubManagementList from '../../components/Lists/MyPageLists/SubManagementList';
import { useGet } from '../../hooks/useFetch';

function SubManage() {
	const { pathname } = useLocation();
	// 페이지네이션으로 할건지? 무한 스크롤로 할 건지?
	const {
		data: subManageDatas,
		isError,
		isLoading,
	} = useGet(
		'http://ec2-43-201-37-71.ap-northeast-2.compute.amazonaws.com:8080/orders/subs',
		pathname,
	);
	console.log(subManageDatas, '섭매니지');
	return (
		<SubManageContainer>
			{subManageDatas?.data?.data.map((subManageData, idx) => (
				<SubManagementList
					key={`${idx.toString()}-${subManageData}`}
					subManageData={subManageData}
				/>
			))}
		</SubManageContainer>
	);
}

export default SubManage;

const SubManageContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 4px;
	margin: 25px 0 75px 0;
	border-radius: 10px;
	background-color: white;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);

	& > {
		:last-child {
			border: none;
		}
	}
`;
