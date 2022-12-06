import { useLocation } from 'react-router-dom';
import DefaultPayment from '../components/Etc/DefaultPayment';

// 정기결제 페이지

function SubPayment() {
	const location = useLocation();
	const payData = location.state;
	return <DefaultPayment payData={payData} titleName="정기 결제" isSub />;
}

export default SubPayment;
