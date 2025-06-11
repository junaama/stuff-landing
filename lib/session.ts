import type { SessionOptions } from 'iron-session';

export interface SessionData {
    username: string;
    isLoggedIn: boolean;
    counter: number;
    isAdmin: boolean;
}

export const defaultSession: SessionData = {
    username: "",
    isLoggedIn: false,
    counter: 0,
    isAdmin: false,
};

export const sessionOptions: SessionOptions = {
    password: process.env.ADMIN_SESSION_PASSWORD as string,
    cookieName: 'admin-session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
};