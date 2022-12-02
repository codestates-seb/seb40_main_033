// 일반결제 페이지
import { useLocation } from 'react-router-dom';
import DefaultPayment from '../components/Etc/DefaultPayment';

function Payment() {
	const location = useLocation();
	const payData = location.state;
	console.log(payData, '페이먼트');
	return <DefaultPayment payData={payData} titleName="일반 결제" />;
}

export default Payment;
