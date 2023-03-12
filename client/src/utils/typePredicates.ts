import { FormValue, UserFormValues } from '../types/auth.type';

const isSignUp = (form: FormValue): form is UserFormValues =>
	'비밀번호확인' in form;

export default isSignUp;
