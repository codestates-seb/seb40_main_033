import { useState } from 'react';
import PayMethod from './PayMethod';
import PayDestination from './PayDestination';

export default function PaymentInfoMethod() {
	return (
		<>
			<PayDestination />
			<PayMethod />
		</>
	);
}
