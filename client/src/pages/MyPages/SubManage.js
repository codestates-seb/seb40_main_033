// 정기구독관리
import { useLocation, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import SubManagementList from '../../components/Lists/MyPageLists/SubManagementList';
import { usePost, useDelete, usePatch, useGet } from '../../hooks/useFetch';

function SubManage() {
	const { pathname } = useLocation();

	const { isLoading, isError, data, error } = useGet(
		'https://jsonplaceholder.typicode.com/todos/1',
		pathname,
	);
	console.log(data);

	const { mutate, isError, data, error } = usePost(
		'https://jsonplaceholder.typicode.com/todos/1',
	);

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
				onClick={() => mutate({ title: '테스트 하는데 뭐 문제 있는지?' })}
			>
				post
			</button>
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
