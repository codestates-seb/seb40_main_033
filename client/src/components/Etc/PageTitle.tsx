import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { TempLogo } from '../../assets/Icons';
import { OrderToggleTab } from '../Tabs/ToggleTabs';
import SortAndPriceFilter from '../Filters/SortAndPriceFilter';
import Search from '../Search/Search';

const togglePath = ['/cart/normal', '/cart/subscription'];

function PageTitle({ title }: { title: string | null }) {
	const { pathname } = useLocation();
	const currentIdx = togglePath.indexOf(pathname);

	// 일반/정기 토글이 장바구니 페이지에서만 보이도록
	const showToggle = pathname.includes('/cart');
	// 가격필터 정렬방법이 목록페이지에서만 보이도록
	const showBtn = pathname.includes('search') || pathname.includes('list');
	// 검색창이 검색목록페이지에서만 보이도록
	const showSearchBar = pathname.includes('search');

	return (
		<Container>
			<TitleContainer>
				{showSearchBar ? (
					<Search rightNav={false} />
				) : (
					<>
						<TempLogo />
						<Title>{title}</Title>
					</>
				)}
			</TitleContainer>
			<TabContainer>
				{showToggle && <OrderToggleTab currentIdx={currentIdx} />}
				{showBtn && <SortAndPriceFilter />}
			</TabContainer>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
	height: 100px;
	border-bottom: 1px solid var(--gray-200);
	padding-bottom: 30px;
	margin-bottom: 40px;
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	svg {
		width: 43px;
		height: 20px;
		margin-bottom: 15px;
	}
`;

const Title = styled.h1`
	font-size: 36px;
	width: fit-content;
	font-weight: var(--extraBold);
`;

const TabContainer = styled.div`
	height: fit-content;
	align-items: flex-end;
`;

export default PageTitle;
