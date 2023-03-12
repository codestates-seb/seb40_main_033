import { ChangeHandler } from 'react-hook-form';

export interface User {
	loginStatus?: boolean;
	keepLoggedIn?: boolean;
	accessToken?: string | null;
	refreshToken?: string | null;
	email?: string;
	isSocial?: boolean;
	userId?: string;
}

export interface LogInFormValues {
	이메일: string;
	비밀번호: string;
}

export interface SignUpFormValues extends LogInFormValues {
	비밀번호확인: string;
	닉네임: string;
	주소: string;
	상세주소: string;
	우편번호: string;
	전화번호: string;
	이름: string;
}

export type AuthFormValues = LogInFormValues | SignUpFormValues;

export interface AuthFormProps {
	signUp?: boolean;
	handleSubmitForm: (data: AuthFormValues) => void;
	email?: string;
}

export interface LogInForm {
	email: string;
	password: string;
}

export interface AuthInputProps {
	refAddress: React.MutableRefObject<HTMLInputElement | undefined>;
	onKeyDown: (
		e: React.KeyboardEvent<HTMLInputElement>,
		setShowError: React.Dispatch<React.SetStateAction<boolean>>,
	) => void;
	label:
		| '상세주소'
		| '주소'
		| '이름'
		| '닉네임'
		| '비밀번호'
		| '비밀번호확인'
		| '이메일'
		| '전화번호';
	refHook: (e: HTMLInputElement) => void;
	register: RestHookForm;
	watch: {
		이메일: string;
		비밀번호: string;
		닉네임: string;
		이름: string;
		전화번호: string;
		주소: string;
		상세주소: string;
		비밀번호확인: string;
	};
	errors?: string;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	readonly?: boolean;
}

export interface RestHookForm {
	onChange: ChangeHandler;
	onBlur: ChangeHandler;
	name: string;
	min?: string | number | undefined;
	max?: string | number | undefined;
	maxLength?: number | undefined;
	minLength?: number | undefined;
	pattern?: string | undefined;
	required?: boolean | undefined;
	disabled?: boolean | undefined;
}
