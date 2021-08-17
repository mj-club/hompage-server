import React, { Fragment, useState } from 'react';
import { useForm } from "react-hook-form";
import { join, emailCheck, phCheck, studentIdCheck} from "../../actions";
import { useDispatch, useSelector } from "react-redux";

//TODO
// joinForm, reducer, action - debugging한거 지우기

const JoinForm = () => {
  //validation
  const { register, handleSubmit, setError, errors } = useForm({
    mode: "onBlur"
  });
  const onSubmit = data => console.log(data);
  console.log("error", errors);

  // store value
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [phNumber, setPhNumber] = useState(null);
  const [isStudent, setIsStudent] = useState(true);
  const [department, setDepartment] = useState(null);
  const [schoolYear, setSchoolYear] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [major, setMajor] = useState(null);

  const [isEmailExist, setIsEmailExist] = useState(null); // check duplicate
  const [isPhExist, setIsPhExist] = useState(null); // check duplicate
  const [isIdExist, setIsIdExist] = useState(null); // check duplicate

  const emailCheckMessage = useSelector(state => state.authReducer.check_email_message);
  const phCheckMessage = useSelector(state => state.authReducer.check_ph_message);
  const studentIdCheckMessage = useSelector(state => state.authReducer.check_studentid_message);
  
  
  const dispatch = useDispatch();

  function onEmailCheck() {
    if (!errors.email) {
      //emailCheck구현하기
      dispatch(emailCheck(email));
      //중복이 아니면 isEmailExist true로 설정하기
      if (emailCheckMessage == "사용가능한 이메일입니다") {
        setIsEmailExist(false);
      } else if (emailCheckMessage == "이미 사용중인 이메일입니다.") {
        console.log(emailCheckMessage);
        setIsEmailExist(true);
      } else {
        console.log("onemailCheck()__message : ", emailCheckMessage);
      }
      console.log(isEmailExist);
    }
  }

  function onPhCheck() {
    if (!errors.ph) {
      console.log("onPhCheck()__phNumber : ", phNumber);
      dispatch(phCheck(phNumber));
      if (phCheckMessage == "사용가능한 번호입니다.") {
        setIsPhExist(false);
      } else if (phCheckMessage == "이미 사용중인 번호입니다.") {
        console.log("phCheck message : ", phCheckMessage);
        setIsPhExist(true);
      } else {
        console.log("onPhCheck()__message: ", phCheckMessage);
      }
      console.log("onPhCheck() isPhExist :", isPhExist);
    }
  }

  function onStudentIdCheck() {
    if (!errors.schoolId) {
      dispatch(studentIdCheck(studentId));
      if (studentIdCheckMessage == "사용가능한 학번입니다.") {
        setIsIdExist(false);
      } else if(studentIdCheckMessage == "이미 사용중인 학번입니다.") {
        setIsIdExist(true);
      } else{
        console.log("onStudentIdCheck() message :",studentIdCheckMessage);
      }
      console.log(isIdExist);
    }
  }

  function onJoin() {
    //Form에 적절한 값이 들어가면 
    //href="/welcome"으로 이동
    let body = null;
    console.log("isStudent : ", isStudent);
    if (isStudent) {
      if (email && name && password && phNumber && department && schoolYear && studentId && major) {
        //값이 모두 null이 아니면 보내줌
        console.log("in");
        body = { email, name, password, ph_number:phNumber, department, school_year:schoolYear, student_id:studentId, major };
      }
    } else {
      if (email && name && password && phNumber) { 
        body = { email, name, password, ph_number:phNumber };
      }
    }

    if(body){
      dispatch(join(body));
      window.location.href="/welcome";
    } else {
      console.log("onJoin(body) body :", body);
    }
    
    
  }

  return (
    <>
      <style type="text/css">
        {`
      .is-student{
        color: #343a40;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-top: 60px;
      }

      .float-right{
        margin-top : 5px;
        float: right;
      }
    
      .text-end{
        margin-top : 5px;
        text-align: right;
      }

      .form-select{
        width: 100%;
        min-height: 56px;
        padding: 3px 20px;
        color: #748494;
        border: 1px solid #F5F5F5;
        border-radius: 5px;
        outline: none;
        background-color: #F5F5F5;
      }

      .duplicate-check{
        font-size: 12px;
        line-height: 35px;
        height: 30px;
        padding: 0 15px;
      }
      
      #space{
        display:block;
      }
      `}
        {/* css - 글자 색이 조금 다른 부분 더 똑같이 고치기 */}
      </style>
      <Fragment>
        <form action="/welcome" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12 col-12 mb-4">
            <p>이메일</p>
            <input type="email" placeholder="Email *" name="email" ref={register({
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "잘못된 이메일입니다"
              },
              //isEmailExist가 true면 error -> "이미 가입된 이메일입니다."
            })} onChange={
              ({ target: { value } }) => setEmail(value)
            } />
            <div className="float-right">
              <button className="btn btn-primary btn-hover-secondary duplicate-check"
              name="check-duplicate"
                onClick={() => {
                  onEmailCheck();
                }
                }>중복확인</button>
            </div>
            {isEmailExist ? <p>{emailCheckMessage}</p> : <p>{emailCheckMessage}</p>}
            {errors.email && <p>{errors.email.message}</p>}



          </div>

          <p>비밀번호</p>
          <div className="col-md-12 col-12 mb-4">
            <input type="password" placeholder="Pssword *" name="password"
              ref={register({
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호는 영문, 숫자, 특수문자를 포함한 8~20글자입니다"
                },
                maxLength: 20,
                pattern: {
                  value: /[a-zA-Z0-9!@#$%^&*()-=+;'":,.]/,
                  message: "비밀번호는 영문, 숫자, 특수문자를 포함한 8~20글자입니다"
                }
              })} onChange={
                ({ target: { value } }) => setPassword(value)
              } />
            {errors.password && <p>{errors.password.message}</p>}

          </div>
          <div className="col-md-12 col-12 mb-4">
            <input type="password" placeholder="Check Pssword *" name="checkPassword"
              ref={register({
                required: "비밀번호를 다시 한번 입력해주세요"
              })}
              onBlur={({ target: { value } }) => {
                const password = document.getElementsByName("password")[0].value;
                console.log("passwrd", password);
                console.log("check-password", value);
                const isSamePw = password == value;
                console.log(isSamePw);
                if (!isSamePw) {
                  setError("checkPassword", {
                    type: "isSame",
                    message: "비밀번호가 다릅니다",
                  });
                }
              }}
            />
            {errors.checkPassword && <p>{errors.checkPassword.message}</p>}
          </div>

          <p>개인정보</p>
          {/* 이름 */}
          <div className="col-md-12 col-12 mb-4">
            <input type="text" placeholder="Your Name *" name="name"
              ref={register({ required: '이름을 입력해주세요' })}
              onChange={({ target: { value } }) => setName(value)} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          {/* 핸드폰 */}
          <div className="col-md-12 col-12 mb-4">
            <input type="text" placeholder="01012341234 *" name="ph"
              ref={register({
                required: "핸드폰 번호를 입력해주세요",
                maxLength: 11,
                pattern: {
                  value: /[0-9]$/g,
                  message: "숫자만 입력해주세요"
                }
              })}
              onChange={
                ({ target: { value } }) => setPhNumber(value)
              } />
            <div className="float-right">
              <button className="btn btn-primary btn-hover-secondary duplicate-check"
                onClick={() => {
                  onPhCheck();
                }
                }>중복확인</button>
            </div>
            {isPhExist ? <p>{phCheckMessage}</p> : <p>{phCheckMessage}</p>}
            {errors.ph && <p>{errors.ph.message}</p>}


          </div>

          <p className="is-student">
            <input type="checkbox" name="isStudent" defaultChecked={true} onClick={() => {
              if (isStudent) {
                setIsStudent(false);
              } else {
                setIsStudent(true);
              }
            }
            } />
            <label>&nbsp;명지대 학생입니다</label>
          </p>
          {!isStudent &&
            <style type="text/css">
              {`
              #student-info {
                display:none;
              }
              `}
            </style>
          }

          <div id="student-info">
            <p>학생정보</p>
            <div className="col-md-12 col-12 mb-4">
              {/* 단과대학 */}
              <select className="form-select" defaultValue="null"
                onChange={({ target: { value } }) => setDepartment(value)}>
                <option disabled="disabled" value="null">단과대학 선택</option>
                <option value="인문대학">인문대학</option>
                <option value="사회과학대학">사회과학대학</option>
                <option value="경영대학">경영대학</option>
                <option value="법과대학">법과대학</option>
                <option value="ICT융합대학">ICT융합대학</option>
                <option value="미래융합대학">미래융합대학</option>
                <option value="방목기초교육대학">방목기초교육대학</option>
              </select>
            </div>

            <div className="col-md-12 col-12 mb-4">
              {/* 학과 */}
              <select id="select-major" className="form-select" defaultValue="null"
                onChange={({ target: { value } }) => setMajor(value)}>
                <option disabled="disabled" value="null">학과</option>{/*placeholder*/}
                {department === "인문대학" &&
                  <>

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
                  </>
                }
                {department === "사회과학대학" &&
                  <>

                    <option value="행정학과">행정학과</option>
                    <option value="경제학과">경제학과</option>
                    <option value="정치외교학과">정치외교학과</option>
                    <option value="디지털미디어학과">디지털미디어학과</option>
                    <option value="아동학과">아동학과</option>
                    <option value="청소년지도학과">청소년지도학과</option>
                  </>
                }
                {department === "경영대학" &&
                  <>

                    <option value="경영학과">경영학과</option>
                    <option value="국제통상학과">국제통상학과</option>
                    <option value="경영정보학과">경영정보학과</option>
                    <option value="부동산학과">부동산학과</option>
                  </>
                }

                {department === "법과대학" &&
                  <>

                    <option value="법학과">법학과</option>
                    <option value="법무정책학과">법무정책학과</option>
                  </>
                }
                {department === "ICT융합대학" &&
                  <>

                    <option value="디지털콘텐츠디자인학과">디지털콘텐츠디자인학과</option>
                    <option value="융합소프트웨어학과">융합소프트웨어학과</option>
                  </>
                }
                {department === "미래융합대학" &&
                  <>

                    <option value="창의융합인재학부">창의융합인재학부</option>
                    <option value="사회복지학과">사회복지학과</option>
                    <option value="부동산학과">부동산학과</option>
                    <option value="법무행정학과">법무행정학과</option>
                    <option value="심리치료학과">심리치료학과</option>
                    <option value="미래융합경영학과">미래융합경영학과</option>
                    <option value="멀티디자인학과">멀티디자인학과</option>
                    <option value="계약학과">계약학과</option>
                  </>
                }
                {department === "방목기초교육대학" &&
                  <>

                    <option value="전공자유학부">전공자유학부</option>
                    <option value="융합전공학부">융합전공학부</option>
                  </>
                }

              </select>
            </div>
            {/* 학년 */}
            <div className="col-md-12 col-12 mb-4" onChange={({ target: { value } }) => setSchoolYear(value)}>
              <select className="form-select">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>

            <div className="col-md-12 col-12 mb-4">
              <input type="text" placeholder="학번 * ex)60123456" name="schoolId"
                onChange={({ target: { value } }) => setStudentId(value)}
              />

              <div className="float-right">
                <button className="btn btn-primary btn-hover-secondary duplicate-check"
                  name="check-duplicate"
                  ref={register({
                    required: "학번을 입력해주세요",
                    maxLength: 8,
                    pattern: {
                      value: /[0-9]$/g,
                      message: "숫자만 입력해주세요"
                    }
                  })}
                  onClick={() => {
                    onStudentIdCheck();
                  }
                  }>중복확인</button>
              </div>
            </div>
            {isIdExist ? <p>{studentIdCheckMessage}</p> : <p>{studentIdCheckMessage}</p>}
            {errors.schoolId && <p>{errors.schoolId.message}</p>}
          </div>

          <p id="space">&nbsp;</p>
          {/* submit   */}
          <div className="col-12 text-center mb-4">
            <button className="btn btn-primary btn-hover-secondary"
            name="check-duplicate"
              onClick={() => {
                if (isStudent) {
                  if (!isEmailExist && !isPhExist && !isIdExist) {
                    onJoin();
                  } else {
                    console.log("eamilexist", isEmailExist, "isphExist", isPhExist, "isIdExist", isIdExist);
                    setError("checkDuplicate", {
                      type: "duplicate",
                      message: "중복 확인을 해주세요",
                    });
                  }
                } else {
                  if (!isEmailExist && !isPhExist) {
                    onJoin();
                  } else {
                    console.log("eamilexist", isEmailExist, "isphExist", isPhExist, "isIdExist", isIdExist);
                    setError("_checkDuplicate", {
                      type: "_duplicate",
                      message: "중복 확인을 해주세요",
                    });
                  }
                }
              }
              }>회원가입</button>
            {errors.checkDuplicate && <p>{errors.checkDuplicate.message}</p>}

          </div>
        </form>
      </Fragment>
    </>
  )
}

export default JoinForm;
