import React, { useState } from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Table, FormControl, Form, Container, Col, Row } from 'react-bootstrap';
// import "../../style/JoinForm.css"
import FormCard from "./FormCard";
import { useDispatch, useSelector } from "react-redux";
import { join, emailCheck } from "../../actions";

function JoinFormContent() {

  const [id, setId] = useState(null);
  const [domain, setDomain] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [phNumber, setPhNumber] = useState(null);
  const [sex, setSex] = useState("female");
  const [department, setDepartment] = useState("인문대학");
  const [schoolYear, setSchoolYear] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [major, setMajor] = useState("국어국문학과");
  const [snsId, setSnsId] = useState(null);

  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isValid, setIsValid] = useState(false); // 데이터가 valid한지

  const emailCheckMessage = useSelector((state) => state.authReducer.message);

  const dispatch = useDispatch();

  function goBack() {
    window.history.back();
  };

  function onEmailCheck() {
    //emailCheck구현하기
    dispatch(emailCheck(email));
    console.log(emailCheckMessage);
    //emailCheck가 잘 되면 isEmailchecked true로 설정하기
    if (emailCheckMessage == "사용가능한 이메일이에요") {
      setIsEmailExist(false);
    } else {
      setIsEmailExist(true);
    }
    console.log(isEmailExist);
    //서버랑 잘되는지 확인 어떻게?
  };

  //각 input들 valid체크하기
  function valid() {

  }

  function onJoin() {
    //Form에 적절한 값이 들어가면 
    //href="/welcome"으로 이동
    const body = { email, name, password, phNumber, sex, department, schoolYear, studentId, major, snsId };
    console.log(email, name, password, phNumber, sex, department, schoolYear, studentId, major, snsId);
    dispatch(join(body));
  };

  return (
    <>
      <style type="text/css">
        {`
          .body{
            border :3px solid #F1C40F;
          }
          
          .top-icon{
            text-align : center;
          }
          
          .content{
            text-align : center;
          }
          
          .form-title{
            font-size: 2rem;
            margin-top: 16px;
            margin-bottom : 16px;
          }
          
          .form-sub-title{
            text-align: left;
          }
          
          .form-table{
          text-align: start;
          }
          
          label.form-labels.form-label{
            margin: 0;
          }
          h5 {
            margin-top: 45px;
          }
          
          
          #valid-btn{
            font-size: 0.5rem;
            float: right;
          }
          
          
          #isStudent{
            text-align: right;
          }
          
        `
        }
      </style>
      <Row className="justify-content-md-center">
        <Col md={10} lg={8}>
          <Form className="p-3">
            {/* start of table1 */}
            <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300">
              <div className="contact-form-area">
                <SectionTitle
                  titleOption="section-title text-center mb-7"
                  headingOption="title fz-28"
                  title="Let’s talk about your project"
                  subTitle="We have made it easy for clients to reach us
                                    and get their solutions weaved"
                />

                <ProjectForm />
              </div>
            </div>


            <div className="form-sub-title"><h5 className="fw-bold">아이디 정보</h5></div>
            <Table className="form-table">
              <tbody>
                <tr>
                  <td>
                    <Form.Label className="form-labels">이메일</Form.Label>
                    <Container className="p-0 m-0 text-center">
                      <Row>
                        <Col className="p-0 m-0" xs={5}><FormControl id="id" onChange={({ target: { value } }) => { setId(value) }} /></Col>
                        <Col className="p-0 m-0" xs={1}>@</Col>
                        <Col className="p-0 m-0" xs={6}>
                          {/* 이상하게 <Form.Select />가 없어서 react-bootstrap사이트 가서 inspect보고 적음... */}
                          <FormControl id="domain" onChange={({ target: { value } }) => { setDomain(value) }} />
                        </Col>
                      </Row>
                    </Container>
                    <Button
                      id="valid-btn"
                      className="p-1 mt-1"
                      onClick={() => {
                        setEmail(id + "@" + domain);
                        onEmailCheck();
                      }}>중복확인</Button>
                  </td>
                  <td className="p-0 m-0"></td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="form-labels">비밀번호</Form.Label>
                    <FormControl id="pw"
                      pattern="^("
                      onChange={({ target: { value } }) => {
                        setPassword(value);
                        console.log(value);
                        const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
                        console.log(pattern.test(value));
                        if (pattern.test(value)) {
                          document.getElementById("pw-valid").innerHTML = "가능"
                        } else {
                          document.getElementById("pw-valid").innerHTML = "영문, 특수문자, 숫자를 모두 포함하여 8~20글자만 가능합니다."
                          setIsValid(false);
                        }
                      }} />
                    <p id="pw-valid"></p>
                  </td>
                  <td className="p-0 m-0"></td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="form-labels" onChange={({ target: { value } }) => {
                      console.log(value);
                      console.log(password);
                    }}>비밀번호 확인</Form.Label>
                    <FormControl id="checkPw" />
                  </td>
                  <td className="p-0 m-0"></td>
                  {/* 왜인지 모르지만 이 이상한걸 넣어야 css가 안이상해짐 */}
                </tr>
              </tbody>
            </Table>
            {/* end of table1 */}

            <div className="form-sub-title"><h5 className="fw-bold">개인 정보</h5></div>
            <Table className="form-table">
              <tbody>
                <tr>
                  <td>
                    <Form.Label className="form-labels">이름</Form.Label>
                    <FormControl id="name" onChange={({ target: { value } }) => {
                      setName(value);
                    }} />
                  </td>
                  <td className="p-0"></td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="form-labels">휴대폰</Form.Label>
                    <FormControl id="phNumber" placeholder='"-"를 빼고 입력해주세요 ex) 01012341234' onChange={({ target: { value } }) => {
                      setPhNumber(value);
                    }} />
                    {/* <Container className="p-0 m-0 text-center">
                  <Row>
                    <Col className="p-0 m-0" xs={3}><FormControl id="ph-number" /></Col>
                    <Col className="p-0 m-0" xs={1}>-</Col>
                    <Col className="p-0 m-0" xs={3}><FormControl id="ph-number" /></Col>
                    <Col className="p-0 m-0" xs={1}>-</Col>
                    <Col className="p-0 m-0" xs={4}><FormControl id="ph-number" /></Col>
                  </Row>
                </Container> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="form-labels">성별</Form.Label>
                    <select className="form-select" onChange={({ target: { value } }) => {
                      setSex(value);
                    }}>
                      <option value="female">여자</option>
                      <option value="male">남자</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </Table>

            <div className="form-sub-title"><h5 className="fw-bold">학생 정보</h5></div>
            <div id="isStudent"><Form.Check className="mb-2" label="학생 아님"></Form.Check></div>
            <Table className="form-table">
              <tbody>
                <tr>
                  <td>
                    <Form.Label className="form-labels" onChange={({ target: { value } }) => {
                      setDepartment(value);
                    }}>단과대학</Form.Label>
                    <select className="form-select" >
                      <option value="인문대학">인문대학</option>
                      <option value="사회과학대학">사회과학대학</option>
                      <option value="경영대학">경영대학</option>
                      <option value="법과대학">법과대학</option>
                      <option value="ICT융합대학">ICT융합대학</option>
                      <option value="미래융합대학">미래융합대학</option>
                      <option value="방목기초교육대학">방목기초교육대학</option>
                    </select>
                  </td>
                  <td className="p-0"></td>
                </tr>

                <tr>
                  <td>
                    <Form.Label className="form-labels">학과</Form.Label>
                    <select className="form-select" onChange={({ target: { value } }) => {
                      setMajor(value);
                    }}>
                      <option value="국어국문학과">국어국문학과</option>
                      <option value="중어중문학과">중어중문학과</option>
                      <option value="일어일문학과">일어일문학과</option>
                      <option value="영어영문학과">영어영문학과</option>
                      <option value="사학과">사학과</option>
                      <option value="문헌정보학과">문헌정보학과</option>
                      <option value="아랍지역학과">아랍지역학과</option>
                      <option value="미술사학과">미술사학과</option>
                      <option value="철학과">철학과</option>
                      <option value="문예창작과">문예창작과</option>
                      <option value="행정학과">행정학과</option>
                      <option value="경제학과">경제학과</option>
                      <option value="정치외교학과">정치외교학과</option>
                      <option value="디지털미디어학과">디지털미디어학과</option>
                      <option value="아동학과">아동학과</option>
                      <option value="청소년지도학과">청소년지도학과</option>
                      <option value="경영학과">경영학과</option>
                      <option value="국제통상학과">국제통상학과</option>
                      <option value="경영정보학과">경영정보학과</option>
                      <option value="부동산학과">부동산학과</option>
                      <option value="법학과">법학과</option>
                      <option value="법무정책학과">법무정책학과</option>
                      <option value="디지털콘텐츠디자인학과">디지털콘텐츠디자인학과</option>
                      <option value="융합소프트웨어학과">융합소프트웨어학과</option>
                      <option value="창의융합인재학부">창의융합인재학부</option>
                      <option value="사회복지학과">사회복지학과</option>
                      <option value="부동산학과">부동산학과</option>
                      <option value="법무행정학과">법무행정학과</option>
                      <option value="심리치료학과">심리치료학과</option>
                      <option value="미래융합경영학과">미래융합경영학과</option>
                      <option value="멀티디자인학과">멀티디자인학과</option>
                      <option value="전공자유학부">전공자유학부</option>
                      <option value="융합전공학부">융합전공학부</option>
                    </select>
                  </td>
                  <td className="p-0"></td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="form-labels">학년</Form.Label>
                    <FormControl id="schoolYear" onChange={({ target: { value } }) => {
                      setSchoolYear(value);
                    }} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="form-labels">학번</Form.Label>
                    <FormControl id="studentId" onChange={({ target: { value } }) => {
                      setStudentId(value);
                    }} />
                  </td>
                </tr>

              </tbody>
            </Table>

            <Button variant="secondary" className="mr-1" onClick={goBack}>이전</Button>
            <Button className="ml-1" type="button" onClick={() => { onJoin() }} >회원가입</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

const content = <JoinFormContent />

const JoinForm_old = () => {
  return (
    <FormCard icon={faUserPlus} content={content} title={"회원가입"} />
  );
}

export default JoinForm_old;