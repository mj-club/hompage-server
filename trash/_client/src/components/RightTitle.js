import React from "react"
import { Container, Col, Row} from 'react-bootstrap';
// import "../style/RightTitle.css";
const RightTitle = ({title, menu1, menu2, menu3}) => {
  const subtitle = "Home > 회원가입"
  return (
    <>    
    <style>
      {
        `
        .right-title{
          text-align: end;
          padding-top: 15px;
          border-bottom : 1px solid gray;
          font-family: "twayair";
        }
        
        .mb-0.col-4{
          border-bottom: 3.5px solid #A99371;
        }
        `
      }
    </style>
    <Container className="RightTitle mt-3 mb-5" >
      <Row >
        <Col className="mb-0" xs="4"><h2>{title}</h2></Col>
        {/* 링크가 먹도록 */}
        <Col className="mb-0 right-title">{subtitle}</Col>
      </Row>      
    </Container>
    </>
  );
}

export default RightTitle;