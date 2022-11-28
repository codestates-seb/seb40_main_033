import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import Postcode from '@actbase/react-daum-postcode';
import PayPageContainer from './PayPageContainer';
import AddressModal from '../Modals/AddressModal';

export default function PayDestination() {
	const [isModal, setModal] = useState(false);
	const [destInputValue, setDestInputValue] = useState({
		realName: '',
		phone: '',
		address: '',
		detailAddress: '',
	});
	const onAddressChange = useCallback((data) => {
		setDestInputValue({
			...destInputValue,
			address: `(${data.zonecode})${data.address}`,
		});
		setModal(false);
	});
	const onDestChange = useCallback(
		(e) => {
			const { value, name } = e.target;
			setDestInputValue({ ...destInputValue, [name]: value });
		},
		[destInputValue],
	);
	const handleOpenDestAddress = useCallback(() => {
		setModal(true);
	}, [isModal]);
	return (
		<PayPageContainer>
			<PayDestHeading>배송지 정보</PayDestHeading>
			<DestInputContainer>
				<DestInputBox>
					<DestInputLabel>이름</DestInputLabel>
					<DestInput
						placeholder="이름"
						name="realName"
						value={destInputValue.realName}
						onChange={onDestChange}
					/>
				</DestInputBox>
				<DestInputBox>
					<DestInputLabel>전화번호</DestInputLabel>
					<DestInput
						placeholder="전화번호"
						name="phone"
						value={destInputValue.phone}
						onChange={onDestChange}
					/>
				</DestInputBox>
				<DestInputBox>
					<DestInputLabel>주소</DestInputLabel>
					<DestInput
						placeholder="주소"
						onClick={handleOpenDestAddress}
						name="address"
						value={destInputValue.address}
					/>
				</DestInputBox>
				<DestInputBox className="last">
					<DestInputLabel />
					<DestInput
						placeholder="상세주소"
						name="detailAddress"
						value={destInputValue.detailAddress}
						onChange={onDestChange}
					/>
				</DestInputBox>
			</DestInputContainer>
			{isModal && (
				<AddressModal setIsOpen={setModal} modalIsOpen={isModal}>
					<Postcode
						style={{ width: 600, height: 500 }}
						jsOptions={{ animation: true, hideMapBtn: true }}
						onSelected={onAddressChange}
					/>
				</AddressModal>
			)}
		</PayPageContainer>
	);
}

const PayDestHeading = styled.h2`
	font-size: 20px;
	color: var(--gray-500);
	margin-bottom: 44px;
`;

const DestInputContainer = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
const DestInputBox = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 30px;
	&.last {
		margin-bottom: 0px;
	}
`;

const DestInputLabel = styled.label`
	color: var(--gray-400);
	margin-top: 6px;
`;

const DestInput = styled.input`
	width: 296px;
	border: 0;
	padding-bottom: 4px;
	border-bottom: 1px solid var(--gray-300);
	outline: none;
	font-size: 13px;
	word-break: break-all;

	:focus {
		border-bottom: 1px solid var(--purple-300);
	}
	&[type='password'] {
		font-family: 'Courier New', Courier, monospace;
	}
	&.error {
		border-bottom: 1px solid var(--red-100);
	}
	::placeholder {
		color: var(--gray-300);
		font-size: 13px;
	}
`;
