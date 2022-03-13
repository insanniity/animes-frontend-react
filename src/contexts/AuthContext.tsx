import { AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "services/api";
import { LoginResponse, Role, TokenData } from "types/auth";
import { clearStorage, getAuthData, saveAuthData } from "utils/storage";

type Props = {
    children: React.ReactNode;
}

type User = {
    email: string;
    authorities: string[];
}

type LoginState = {
    username: string;
    password: string;
}
  

export type AuthContextType ={
    isAuthenticated: () => boolean;
    user: User | null;
    signIn: (data: LoginState) => Promise<void>;
    signOut: () => void;
    hasAnyRoles: (authorities: Role[]) => boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const getTokenData = () : TokenData | undefined => {
    const { access_token } = getAuthData();
    try{
        return jwtDecode(access_token) as TokenData;
    }catch (error){
        return undefined;
    }
}


const AuthProvider = ({ children } : Props) => {  
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = () => {
        const { access_token } = getAuthData();
        if (access_token) {
            const {exp} = jwtDecode(access_token) as TokenData;
            return (exp * 1000 > Date.now());
        }
        return false;
    }

    const signIn = async ({username, password}:LoginState) => {  
        API.login({username, password})
            .then((res: AxiosResponse<LoginResponse>)=>{
                saveAuthData(res.data);     
                navigate("/painel");        
            })
            .catch((err) => toast.error(err));
    }

    const signOut =  () => {
        clearStorage();
        setUser(null);
        navigate("/auth/login");
    }

    const hasAnyRoles = (roles:Role[]):boolean => {
        const tokenData = getTokenData();
        if(roles.length === 0 ) return false;
        if(tokenData !== undefined){
            return roles.some(role => tokenData.authorities.includes(role));
        }
        return false;
    }

    useEffect(() => {
        const { access_token } = getAuthData();
        if (access_token) {
            const {user_name, authorities} = jwtDecode(access_token) as TokenData;
            setUser({email: user_name, authorities});
            if (!isAuthenticated() || hasAnyRoles(["ROLE_USER"])) {
                clearStorage();
                navigate("/auth/login");
                toast.error("Você não tem permissão para acessar esta página");
            } 
        }
    } , [navigate])

    

    return (
        <AuthContext.Provider value={{isAuthenticated, user, signIn, signOut, hasAnyRoles}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;


export const useAuth = () => useContext(AuthContext);


