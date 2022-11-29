// 정기구독관리
import styled, { css } from 'styled-components';
import SubManagementList from '../../components/Lists/MyPageLists/SubManagementList';

function SubManage() {
	return (
		<SubManageContainer>
			<SubManagementList />
			<SubManagementList />
			<SubManagementList />
			<SubManagementList />
			<SubManagementList />
			<SubManagementList />
		</SubManageContainer>
	);
}

export default SubManage;

const SubManageContainer = styled.main`
	display: flex;
	flex-direction: column;
`;
