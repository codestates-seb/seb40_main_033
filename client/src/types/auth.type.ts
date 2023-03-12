export interface User {
	loginStatus?: boolean;
	keepLoggedIn?: boolean;
	accessToken?: string | null;
	refreshToken?: string | null;
	email?: string;
	isSocial?: boolean;
	userId?: string;
}

export interface UserFormValues {
	이메일: string;
	비밀번호: string;
	비밀번호확인: string;
	닉네임: string;
	주소: string;
	상세주소: string;
	우편번호: string;
	전화번호: string;
	이름: string;
}

export interface AuthFormProps {
	signUp?: boolean;
	handleSignUp?: (data: UserFormValues) => void;
	handleLogIn?: (data: UserFormValues) => void;
	email?: string;
}

export interface LogInForm {
	email: string;
	password: string;
}
