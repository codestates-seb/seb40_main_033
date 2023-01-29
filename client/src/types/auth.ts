export interface User {
	loginStatus: boolean;
	keepLoggedIn: boolean;
	accessToken: string | null;
	refreshToken: string;
	email: string;
	isSocial: boolean;
	userId: string;
}
