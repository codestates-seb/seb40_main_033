import {
	AuthFormValues,
	LogInFormValues,
	SignUpFormValues,
} from '../types/auth.type';

const isSignUp = (form: AuthFormValues): form is SignUpFormValues =>
	'비밀번호확인' in form;

const isLogIn = (form: AuthFormValues): form is LogInFormValues =>
	!('비밀번호확인' in form);

export { isSignUp, isLogIn };
