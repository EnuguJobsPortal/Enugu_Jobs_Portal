import { IUserDecoded } from "@/interfaces/general";
import jwtDecode from "jwt-decode";
import { isEmpty } from "lodash";
import { NavigateFunction } from "react-router-dom";

function setToken(token: string) {
    localStorage.setItem("accessToken", token);
}

function setRefreshToken(token: string) {
    localStorage.setItem("refreshToken", token);
}

function getToken() {
    return localStorage.getItem("accessToken");
}

function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

function getDecodedJwt(tkn = ""): IUserDecoded {
    try {
        const token = getToken();
        const t = token || tkn;
        const decoded = jwtDecode<IUserDecoded>(t);
        return decoded;
    } catch (error) {
        return {} as IUserDecoded;
    }
}

function isAuthenticated() {
    try {
        const decodedToken = getDecodedJwt();
        if (!isEmpty(decodedToken)) {
            const { exp } = decodedToken;
            const currentTime = Date.now() / 1000;

            if (exp) {
                return exp > currentTime;
            }

            return true;    
        }
        return false;
    } catch (e) {
        return false;
    }
}

function removeToken(navigate?: NavigateFunction) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    if (navigate) {
        navigate("/signin");
    }
}

const Auth = {
    getDecodedJwt,
    getRefreshToken,
    getToken,
    isAuthenticated,
    setRefreshToken,
    setToken,
    removeToken,
};

export default Auth;
