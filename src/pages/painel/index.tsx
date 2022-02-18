import { useAuth } from "contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Role } from "types/auth";

type Props = {
    role?: Role[];
}

const HasPermissao = ({role} : Props) => {
    const { hasAnyRoles } = useAuth();
    if(role && role.length > 0 && hasAnyRoles(role)){
        return <Outlet/>
    }else{
        return <Navigate to="/painel" replace />;
    }
}


export default HasPermissao;