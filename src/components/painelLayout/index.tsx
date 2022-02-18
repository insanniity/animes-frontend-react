import MyHeader from "components/header";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";



const PainelLayout = () => { 
    const {isAuthenticated, hasAnyRoles, signOut} = useAuth();
    
    useEffect(() => {
        if(!isAuthenticated || hasAnyRoles(['ROLE_USER'])){
            toast.error('Você não tem permissão para acessar esta página');
            signOut();
        }
    } , [isAuthenticated, hasAnyRoles, signOut]);

    return (
        <>  
            <MyHeader />
            <Container fluid className="mt-3 px-5">
                <Outlet />
            </Container>
        </>
    )
}

export default PainelLayout;