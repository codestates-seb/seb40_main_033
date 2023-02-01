import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
	const { pathname } = useLocation();

	// 위치가 변경될 때마다 화면 최상단으로 이동
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export default ScrollToTop;
