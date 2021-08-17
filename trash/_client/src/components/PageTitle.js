import React from "react"
import { Container, Col, Row} from 'react-bootstrap';
import "../style/PageTitle.css";

const PageTitle = ({title, menu1, menu2, menu3}) => {
  return (
    <>
    <Container>
      <Row >
        <Col className="mb-0"><h1>{title}</h1></Col>
      </Row>      
    </Container>
    </>
  );
}

export default PageTitle;