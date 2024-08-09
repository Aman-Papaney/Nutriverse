import { createContext, useContext } from "react";

export const UserContext = createContext({
    loggedUser: {
        name: "",
        message: "",
        token: "",
        id: 123
    },
    setLoggedUser: () => { },
});

export const UserProvider = UserContext.Provider;


export default function useUser() {
    return useContext(UserContext);
}