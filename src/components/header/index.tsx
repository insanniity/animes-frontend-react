import CustomLink from "components/customLink";
import { useAuth } from "contexts/AuthContext";
import { Container, Nav, Navbar } from "react-bootstrap";


const MyHeader = () => {
    const { signOut } = useAuth();

    return(
        <Navbar variant="light" bg="light" expand="lg" className="shadow">
            <Container fluid>
                <Navbar.Brand href="/painel">
                    <img
                        src="https://via.placeholder.com/200x50.png"
                        alt="Logo"
                        width={200}
                        height={50}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="ms-4">
                    <Nav className="me-auto fw-bold text-uppercase">
                        <CustomLink to="/painel/animes">Animes</CustomLink>
                    </Nav>
                    <div className="d-flex">
                        <button className="btn btn-primary px-5" onClick={signOut}> SAIR</button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MyHeader;