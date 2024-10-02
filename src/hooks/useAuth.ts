import Auth from "@/utils/auth";
import React from "react";

const useAuth = () => {
    const loggedUser = Auth.getDecodedJwt();
    const isLoggedIn = Auth.isAuthenticated();
    const role = loggedUser.UserType;
    const logOut = Auth.removeToken;

    const user = React.useMemo(() => {
        return loggedUser;
    }, [loggedUser]);

    return {
        user,
        role,
        logOut,
        loggedUser,
        isLoggedIn,
    };
}

export default useAuth;