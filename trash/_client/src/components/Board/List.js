import React from 'react';
import { Table, Row, Col, Button, Container, Badge } from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";

export default function List() {
  const history = useHistory();
  const location = useLocation();

  return(
    <>
      <Container className="mt-3 mb-5" >
        <Table bordered hover>
          <thead>
            <tr>
              <th> </th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>
                <Badge variant="danger">
                  답변 미완료
                </Badge>
              </td>
              <td>동아리방 지도는 어디에서 확인할 수 있나여????????????????????????????????????????????????????????????????????</td>
              <td>박지원지원</td>
              <td>2021-08-01</td>
              <td>10</td>
            </tr>
            <tr>
              <td>
                <Badge variant="success">
                  답변 완료
                </Badge>
              </td>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            
          </tbody>
        </Table>
      </Container>
      <Row>
        <Col sm={10}/>
        <Col sm={2}>
          <Button onClick={() => {history.push(location.pathname+'/create')}}>
            글 작성하기
          </Button>
        </Col>
      </Row>
    </>
    
  );
}