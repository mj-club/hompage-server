import React from 'react';
import { Row, Form, Button } from 'react-bootstrap';

export default function EditForm() {

  return(
    <>
      <Row  className="justify-content-md-center m-3">
        <Form>
          <Form.Group className="mb-3" controlId="question">
            <Form.Label>질문</Form.Label>
            <Form.Control type="text" placeholder="동아리방 위치는 어디서 확인하나요?" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="answer">
            <Form.Label>답변</Form.Label>
            <Form.Control type="text" placeholder="'키움 이모저모 > 동아리방 지도' 메뉴에서 확인할 수 있습니다." />
          </Form.Group>
          <Button variant="primary" type="submit">
            수정하기
          </Button>
        </Form>
      </Row>
    </>
  );
}