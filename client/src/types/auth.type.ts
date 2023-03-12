export interface User {
	loginStatus?: boolean;
	keepLoggedIn?: boolean;
	accessToken?: string | null;
	refreshToken?: string | null;
	email?: string;
	isSocial?: boolean;
	userId?: string;
}

export interface LogInFormValue {
	이메일: string;
	비밀번호: string;
}

export interface UserFormValues extends LogInFormValue {
	비밀번호확인: string;
	닉네임: string;
	주소: string;
	상세주소: string;
	우편번호: string;
	전화번호: string;
	이름: string;
}

export type FormValue = LogInFormValue | UserFormValues;

export const isSignUp = (form: FormValue): form is UserFormValues =>
	'비밀번호확인' in form;

export interface AuthFormProps {
	signUp?: boolean;
	handleSubmitForm: (data: FormValue) => void;
	email?: string;
}

export interface LogInForm {
	email: string;
	password: string;
}
