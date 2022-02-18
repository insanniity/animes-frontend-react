import { Card, Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";


const AuthLayout = () => {
    return (
      <Container fluid>
          <Row className="vh-100 vw-100 d-inline">
              <Col xl={{ span: 4, offset: 4 }} xs={12}  >
                  <Card className="rounded shadow p-3">                    
                      <Card.Body>
                          <Outlet />                       
                      </Card.Body>
                  </Card>
              </Col>            
          </Row>
      </Container>
    );
  };
  
  
  export default AuthLayout;