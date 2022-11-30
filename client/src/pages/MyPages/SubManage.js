// 정기구독관리
import styled, { css } from 'styled-components';
import SubManagementList from '../../components/Lists/MyPageLists/SubManagementList';
import { usePost } from '../../hooks/useFetch';

function SubManage() {
	const { mutate, isLoading, isError, error, response } = usePost(
		'https://koreanjson.com/users',
	);

	return (
		<SubManageContainer>
			<button
				type="button"
				onClick={() =>
					mutate({
						id: 123,
						name: '이정도',
						username: 'jd1386',
						email: 'lee.jungdo@gmail.com',
						phone: '010-3192-2910',
						website: 'https://leejungdo.com',
					})
				}
			>
				api test
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
