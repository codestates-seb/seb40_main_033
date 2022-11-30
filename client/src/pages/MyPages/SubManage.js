// 정기구독관리
import styled, { css } from 'styled-components';
import SubManagementList from '../../components/Lists/MyPageLists/SubManagementList';
import { usePost, useDelete, usePatch } from '../../hooks/useFetch';

function SubManage() {
	const { mutate: patchMu, response: patchRes } = usePatch(
		'https://jsonplaceholder.typicode.com/todos/1',
	);
	const { mutate: deleteMu, response: deleteRes } = useDelete(
		'https://jsonplaceholder.typicode.com/todos/1',
	);
	console.log('patchRes', patchRes);
	console.log('deleteRes', deleteRes);

	return (
		<SubManageContainer>
			<button
				type="button"
				onClick={() => patchMu({ title: '테스트 하는데 뭐 문제 있는지?' })}
			>
				patch
			</button>
			<button type="button" onClick={() => deleteMu()}>
				delete
			</button>
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
