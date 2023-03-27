import { useLocation } from 'react-router-dom';
import DefaultPaymentForm from '../components/Etc/DefaultPaymentForm';

// 정기결제 페이지

function SubscriptionPayment() {
	const { state: payData } = useLocation();
	return <DefaultPaymentForm payData={payData} titleName="정기 결제" isSub />;
}

export default SubscriptionPayment;
