export interface User {
	loginStatus?: boolean;
	keepLoggedIn?: boolean;
	accessToken: string | null;
	refreshToken?: string | null;
	email?: string;
	isSocial: boolean;
	userId: string | null;
}
