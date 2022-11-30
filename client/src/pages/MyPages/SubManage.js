// 정기구독관리
import styled from 'styled-components';
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
