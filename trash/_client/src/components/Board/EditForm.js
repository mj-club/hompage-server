import React from 'react';
import { Row, Form, Button } from 'react-bootstrap';

export default function EditForm() {

  return(
    <>
      <Row  className="justify-content-md-center m-3">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" placeholder="제목" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={20} />
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Control type="file" multiple />
          </Form.Group>
          <Button variant="primary" type="submit">
            수정하기
          </Button>
        </Form>
      </Row>
    </>
  );
}