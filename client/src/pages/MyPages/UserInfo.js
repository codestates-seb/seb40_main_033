/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
// 회원정보
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import Postcode from '@actbase/react-daum-postcode';
import { useForm } from 'react-hook-form';
import {
	LetterButton,
	LetterButtonColor,
} from '../../components/Buttons/LetterButton';
import DeleteAccountModal from '../../components/Modals/DeleteAccountModal';
import AddressModal from '../../components/Modals/AddressModal';
import GoodbyeModal from '../../components/Modals/GoodbyeModal';

export default function UserInfo() {
	const user = {
		displayName: 'loopy',
		email: 'loopy@gmail.com',
		realName: '최민석',
		address: '(16355)서울특별시 부평구 사직동 광명아파트',
		detailAddress: '303동 1403호',
		phone: '010-2222-2222',
		createdAt: '2022-11-10T15:13:44.815603',
	}; // 테스트를 위한 임시 정보입니다.
	const [isModal, setModal] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [openGoodbye, setOpenGoodbye] = useState(false);
	const [inputValue, setInputValue] = useState({
		닉네임: `${user.displayName}`,
		이메일: `${user.email}`,
		이름: `${user.realName}`,
		전화번호: `${user.phone}`,
		주소: `${user.address}`,
		상세주소: `${user.detailAddress}`,
	});
	const onTextChange = useCallback(
		(e) => {
			const { value, name } = e.target;
			setInputValue({ ...inputValue, [name]: value });
		},
		[inputValue],
	);
	const onAddressChange = useCallback((data) => {
		setInputValue({
			...inputValue,
			주소: `(${data.zonecode})${data.address}`,
		});
		setModal(false);
	});
	const {
		register,
		handleSubmit,
		watch, // 온 체인지 할  때마다 객체에  담아줌
		formState: { errors },
		// setError,
	} = useForm({
		mode: 'onBlur',
	});
	const nicknameReg = register('닉네임', {
		// ref1 자체는 일단 함수임
		required: '닉네임을 입력해주세요.', // 빈 칸일때
		pattern: {
			value: /^[A-Za-z0-9가-힣]{2,9}$/, // 한글 및 숫자 영문자
			message: '한글, 영어, 숫자를 사용해 2~9자 사이로 지어주세요.',
		},
	});
	const mailReg = register('이메일', {
		// required: false,
		required: true,
	});
	// 이메일은 어차피 못바꾸는 값이기 떄문에 사실상 필요가 없음..
	const pwReg = register('비밀번호', {
		required: '비밀번호를 입력해주세요.',
		pattern: {
			value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, // 한글 및 숫자 영문자
			message: '문자, 숫자, 특수문자를 사용해 8자 이상으로 지어주세요.',
		},
		validate: {
			no1234: (value) =>
				value.includes('1234') ? '1234는 포함할 수 없습니다.' : true,
			no0000: (value) =>
				value.includes('0000') ? '0000은 포함할 수 없습니다.' : true,
		},
	});
	const rePwReg = register('비밀번호재확인', {
		required: '비밀번호를 다시 한번 입력해주세요.', // 미확인임 어케할지 알아봐야 하무ㅠㅜㅠㅜ
		validate: {
			matchPreviousPassword: (value) => {
				const { 비밀번호 } = watch();
				return 비밀번호 === value || '비밀번호가 일치하지 않습니다.';
			},
		},
	});
	const nameReg = register('이름', {
		required: '이름을 입력해주세요.',
		pattern: {
			value: /^[가-힣]{2,5}$/, // 한글 및 숫자 영문자
			message: '한글 5글자 이내로 작성해주세요.',
		},
	});
	const telReg = register('전화번호', {
		required: '전화번호를 입력해주세요.',
		pattern: {
			value: /^\d{2,3}-\d{3,4}-\d{4}$/, // 한글 및 숫자 영문자
			message: '올바른 형식으로 작성해주세요.',
		},
	});
	const adressReg = register('주소', {
		required: false,
		// required: true,  원래 얘로 해둬야 함
	});
	const detailAddressReg = register('상세주소', {
		required: false,
	});

	const handleOpenDelete = () => {
		setIsOpen(true);
	};

	const handleOpenAddress = () => {
		setModal(true);
	};

	const handleOpenGoodbye = () => {
		setIsOpen(false);
		setOpenGoodbye(true);
	};

	const onValid = (data) => {
		// 이 안에 다 담겨있다. 이걸 가공을 해서 여기서 api요청을 하면 될 듯.
		console.log('data', data);
	};
	return (
		<MainContainer>
			<Box onSubmit={handleSubmit(onValid)}>
				<InfoBox>
					<InfoHeading>기본 정보</InfoHeading>
					<InputBox>
						<Information
							label="닉네임"
							register={nicknameReg}
							errors={errors?.닉네임?.message}
							value={inputValue.닉네임}
							onTextChange={onTextChange}
						/>
						<Information
							label="이메일"
							value={inputValue.이메일}
							register={mailReg}
							errors={errors?.이메일?.message}
						/>
						<Information
							label="비밀번호"
							register={pwReg}
							onTextChange={onTextChange}
							errors={errors?.비밀번호?.message}
						/>
						<Information
							label="비밀번호재확인"
							register={rePwReg}
							onTextChange={onTextChange}
							errors={errors?.비밀번호재확인?.message}
						/>
					</InputBox>
				</InfoBox>
				<InfoBox>
					<InfoHeading>배송지 정보</InfoHeading>
					<InputBox>
						<Information
							label="이름"
							register={nameReg}
							onTextChange={onTextChange}
							errors={errors?.이름?.message}
							value={inputValue.이름}
						/>
						<Information
							label="전화번호"
							register={telReg}
							onTextChange={onTextChange}
							errors={errors?.전화번호?.message}
							value={inputValue.전화번호}
						/>
						<Information
							label="주소"
							handleOpenAddress={handleOpenAddress}
							register={adressReg}
							errors={errors?.주소?.message}
							value={inputValue.주소}
						/>
						<Information
							label="상세주소"
							register={detailAddressReg}
							onTextChange={onTextChange}
							errors={errors?.상세주소?.message}
							value={inputValue.상세주소}
						/>
					</InputBox>
				</InfoBox>
				<LetterButton>정보 수정</LetterButton>
			</Box>
			<LetterButtonColor
				onClick={handleOpenDelete}
				color="red"
				colorCode="100"
				fontSize="12px"
			>
				회원탈퇴
			</LetterButtonColor>
			<DeleteAccountModal
				setIsOpen={setIsOpen}
				modalIsOpen={modalIsOpen}
				handleOpenGoodbye={handleOpenGoodbye}
				openGoodbye={openGoodbye}
			/>
			<GoodbyeModal setIsOpen={setOpenGoodbye} modalIsOpen={openGoodbye} />
			{isModal && (
				<AddressModal setIsOpen={setModal} modalIsOpen={isModal}>
					<Postcode
						style={{ width: 600, height: 500 }}
						jsOptions={{ animation: true, hideMapBtn: true }}
						onSelected={onAddressChange}
					/>
				</AddressModal>
			)}
		</MainContainer>
	);
}

function Information({
	label,
	handleOpenAddress,
	register,
	errors,
	value,
	onTextChange,
}) {
	return (
		<UserInfoBox>
			{label === '비밀번호재확인' || label === '상세주소' ? (
				<InputLabel />
			) : (
				<InputLabel> {label} </InputLabel>
			)}
			<InputDiv>
				<InfoInput
					id={label}
					type={
						label === '비밀번호' || label === '비밀번호재확인'
							? 'password'
							: 'text'
					}
					readOnly={label === '이메일' || label === '주소'}
					{...(label === '주소' && { onClick: handleOpenAddress })}
					placeholder={label}
					{...register}
					name={label}
					value={value}
					onChange={onTextChange}
					className={errors && 'error'}
				/>
				<ErrorDiv className={errors && 'error'}>{errors}</ErrorDiv>
			</InputDiv>
		</UserInfoBox>
	);
}

const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Box = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #f1f1f1;
	background-color: white;
	width: 864px;
	height: 710px;
	padding: 30px 50px 30px 50px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	border-radius: 10px;

	button {
		align-self: flex-end; // 이 설정 기억해둘 것 엥 얘는 왜 끝에있지 하고 아무거나 건들면 안됨..
		font-weight: var(--regular);
	}

	& + button {
		margin-top: 27px;
		font-weight: var(--regular);
	}
`;

const InfoBox = styled.section`
	display: flex;
	width: 397px;
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
`;

const InfoHeading = styled.h2`
	font-size: 20px;
	color: var(--gray-500);
`;

const InputBox = styled.div`
	margin-left: 22px;
	margin-top: 36px;
`;

const UserInfoBox = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	width: 370px;
	margin-bottom: 14px;
`;
const InputLabel = styled.label`
	color: var(--gray-400);
	margin-top: 6px;
`;
const InputDiv = styled.div`
	display: flex;
	flex-direction: column;
`;

const InfoInput = styled.input`
	width: 296px;
	border: 0;
	padding-bottom: 4px;
	border-bottom: 1px solid var(--gray-300);
	outline: none;
	font-size: 16px;
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
const ErrorDiv = styled.div`
	display: block;
	visibility: hidden;
	&.error {
		visibility: visible;
	}
	color: var(--red-100);
	font-size: 11px;
	margin-top: 5px;
	min-height: 15px;
`;
