export type TokenData = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export type Role = 'ROLE_USER' | 'ROLE_ADMIN';


export type LoginResponse={
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string,
    userName: string,
    userId: number,
}