import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingSpinner } from '../../components/Etc/LoadingSpinner';
import SubManagementList from '../../components/Lists/MyPageLists/SubManagementList';
import { useGet } from '../../hooks/useFetch';
import { NO_SUBSCRIPTION_HISTORY } from '../../assets/Constants';
import { SubscriptedItemOrder } from '../../types/order.type';

interface SubscriptedOrder {
	data: SubscriptedItemOrder[];
}
export default function SubscriptionManagement() {
	const { pathname } = useLocation();
	const { data, isError, isLoading, error } = useGet<SubscriptedOrder>(
		'/orders/subs',
		pathname,
	);
	const subManageDatas = data?.data.data;
	if (isLoading) return <LoadingSpinner />;
	if (isError && error instanceof Error) return <div>{error.message}</div>;
	return (
		<SubManageContainer>
			{subManageDatas === undefined ? (
				<div className="blank">{NO_SUBSCRIPTION_HISTORY}</div>
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
