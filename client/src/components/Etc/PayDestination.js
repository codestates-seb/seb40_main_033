import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import Postcode from '@actbase/react-daum-postcode';
import { useForm } from 'react-hook-form';
import PayPageContainer from './PayPageContainer';
import AddressModal from '../Modals/AddressModal';
import { LetterButton } from '../Buttons/LetterButton';
import { Information } from '../../pages/MyPages/UserInfo';

function PayDestination({ destInputValue, setDestInputValue }) {
	const [isModal, setModal] = useState(false);
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
	const handleDestEdit = useCallback((e) => {
		e.preventDefault(); // 반드시 필요
		console.log(destInputValue);
		// 이 부분은 order로 patch요청을 보내는 함수가 들어가야 합니다. 지금은 그냥 바쁘고 서버도 없어서 콘솔로만 찍은거에여.
	});
	const {
		register,
		formState: { errors },
		// setError,
	} = useForm({
		mode: 'onBlur',
	});
	const nameReg = register('이름', {
		required: '이름을 입력해주세요.',
		pattern: {
			value: /^[가-힣]{2,5}$/, // 한글 영문자
			message: '한글 5글자 이내로 작성해주세요.',
		},
	});
	const telReg = register('전화번호', {
		required: '전화번호를 입력해주세요.',
		pattern: {
			value: /^\d{2,3}-\d{3,4}-\d{4}$/,
			message: '올바른 형식으로 작성해주세요.',
		},
	});
	const addressReg = register('주소', {
		required: '주소를 입력해 주세요.',
	});
	const detailAddressReg = register('상세주소', {
		required: false,
	});
	return (
		<PayPageContainer>
			<PayDestHeading>배송지 정보</PayDestHeading>
			<DestInputContainer>
				<Information
					label="이름"
					register={nameReg}
					onTextChange={onDestChange}
					errors={errors?.이름?.message}
					value={destInputValue.name}
				/>
				<Information
					label="전화번호"
					register={telReg}
					onTextChange={onDestChange}
					errors={errors?.전화번호?.message}
					value={destInputValue.phone}
				/>
				<Information
					label="주소"
					handleOpenAddress={handleOpenDestAddress}
					register={addressReg}
					errors={errors?.주소?.message}
					value={destInputValue.address}
				/>
				<Information
					label="상세주소"
					register={detailAddressReg}
					onTextChange={onDestChange}
					errors={errors?.상세주소?.message}
					value={destInputValue.detailAddress}
				/>
				<LetterButton onClick={handleDestEdit}>배송지 정보 변경</LetterButton>
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
	& > button {
		margin-top: 20px;
		align-self: flex-end;
	}
`;

export default PayDestination;
