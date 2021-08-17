import React from "react";
import { Container, Form, Button, Image, Row, Col } from "react-bootstrap";

const Profile = () => {
  return (
    <>
      <Form>
        <Row className="justify-content-md-center">
          <Col md={10} lg={8}>


            <Container>
              <Row>
                <Col>
                  <Image src="" rounded />
                </Col>
                <Col>
                  <h5>{"이름"}</h5>
                  <a href="">사진 수정</a>
                </Col>
              </Row>

            </Container>

            <Form.Label>소속동아리</Form.Label>
            <Form.Control id="my_club" disabled></Form.Control>

            <Form.Label className="form-labels">휴대폰</Form.Label>
            <Container className="p-0 m-0 text-center">
              <Row>
                <Col className="p-0 m-0" xs={3}><Form.Control id="ph-number" disabled/></Col>
                <Col className="p-0 m-0" xs={1}>-</Col>
                <Col className="p-0 m-0" xs={3}><Form.Control id="ph-number" disabled/></Col>
                <Col className="p-0 m-0" xs={1}>-</Col>
                <Col className="p-0 m-0" xs={4}><Form.Control id="ph-number" disabled/></Col>
              </Row>
            </Container>

            <Form.Label className="form-labels">이메일</Form.Label>
            <Container className="p-0 m-0 text-center">
              <Row>
                <Col className="p-0 m-0" xs={5}><Form.Control id="email-id" /></Col>
                <Col className="p-0 m-0" xs={1}>@</Col>
                <Col className="p-0 m-0" xs={6}>
                  {/* 이상하게 <Form.Select />가 없어서 react-bootstrap사이트 가서 inspect보고 적음... */}
                  <select className="form-select">
                    <option>gmail.com</option>
                    <option>naver.com </option>
                    <option>daum.com</option>
                    <option>직접입력</option>
                  </select>
                </Col>
              </Row>
            </Container>

            <Form.Label className="form-labels">단과대학</Form.Label>
            <select className="form-select">
              <option>인문대학</option>
              <option>사회과학대학</option>
              <option>경영대학</option>
              <option>법과대학</option>
              <option>ICT융합대학</option>
              <option>미래융합대학</option>
              <option>방목기초교육대학</option>
            </select>

            <Form.Label className="form-labels">학과</Form.Label>
            <select className="form-select">
              <option>국어국문학과</option>
              <option>중어중문학과</option>
              <option>일어일문학과</option>
              <option>영어영문학과</option>
              <option>사학과</option>
              <option>문헌정보학과</option>
              <option>아랍지역학과</option>
              <option>미술사학과</option>
              <option>철학과</option>
              <option>문예창작과</option>
              <option>행정학과</option>
              <option>경제학과</option>
              <option>정치외교학과</option>
              <option>디지털미디어학과</option>
              <option>아동학과</option>
              <option>청소년지도학과</option>
              <option>경영학과</option>
              <option>국제통상학과</option>
              <option>경영정보학과</option>
              <option>부동산학과</option>
              <option>법학과</option>
              <option>법무정책학과</option>
              <option>디지털콘텐츠디자인학과</option>
              <option>융합소프트웨어학과</option>
              <option>창의융합인재학부</option>
              <option>사회복지학과</option>
              <option>부동산학과</option>
              <option>법무행정학과</option>
              <option>심리치료학과</option>
              <option>미래융합경영학과</option>
              <option>멀티디자인학과</option>
              <option>전공자유학부</option>
              <option>융합전공학부</option>
            </select>

            <Button variant="secondary">메인으로</Button>
            <Button>수정하기</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Profile;