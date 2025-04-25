import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { UUID } from "crypto";

export interface JwtPayload {
    username?: string;
    idAccount?: UUID;
    fullName?: string;
    gender?: string;
    numberPhone?: string;
    dateOfBirth?: string;
    imageUser?: string;
    role?: string;
};

const getUserFromToken = (): JwtPayload | null => {
    const token = Cookies.get("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded;
    } catch (error) {
        console.error("Token không hợp lệ:", error);
        return null;
    }
};

export default getUserFromToken;