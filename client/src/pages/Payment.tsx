import { useLocation } from 'react-router-dom';
import DefaultPaymentForm from '../components/Etc/DefaultPaymentForm';

function Payment() {
	const { state: payData } = useLocation();
	return (
		<DefaultPaymentForm payData={payData} titleName="일반 결제" isSub={false} />
	);
}

export default Payment;
