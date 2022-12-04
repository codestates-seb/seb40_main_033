import { useLocation } from 'react-router-dom';
import DefaultPayment from '../components/Etc/DefaultPayment';

function Payment() {
	const location = useLocation();
	const payData = location.state;
	return <DefaultPayment payData={payData} titleName="일반 결제" />;
}

export default Payment;
