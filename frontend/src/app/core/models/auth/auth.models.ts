export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthenticateResponse {
    id: number;
    username: string;
    email: string;
    roles: string[];
    isVerified: boolean;
    jwToken: string;
}

export interface ApiResponse<T> {
    succeeded: boolean;
    message: string | null;
    errors: string[] | null;
    data: T;
}