import MyHeader from "components/header";
import { useAuth } from "contexts/AuthContext";
import { Container } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";



const PainelLayout = () => { 
    const {isAuthenticated} = useAuth();
    

    return !isAuthenticated() ? <Navigate to="/auth/login" /> : (
        <>  
            <MyHeader />
            <Container fluid className="mt-4 px-5 mb-5">
                <Outlet />
            </Container>
        </>
    )
}

export default PainelLayout;