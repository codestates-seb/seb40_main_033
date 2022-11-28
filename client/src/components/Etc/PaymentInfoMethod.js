import { useState } from 'react';
import PayMethod from './PayMethod';
import PayDestination from './PayDestination';

export default function PaymentInfoMethod() {
	const [destInputValue, setDestInputValue] = useState({
		이름: '',
		전화번호: '',
		주소: '',
		상세주소: '',
	});
	return (
		<>
			<PayDestination
				destInputValue={destInputValue}
				setDestInputValue={setDestInputValue}
			/>
			<PayMethod />
		</>
	);
}
