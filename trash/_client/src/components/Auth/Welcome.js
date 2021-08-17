import React from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "../../style/Welcome.css";
import {Button} from "react-bootstrap";
import FormCard from "./FormCard";
import { useSelector } from "react-redux";

const WelcomeContent = () => {

  const user_email = useSelector( (state) => state.authReducer.user_email );

  return (
    <div>
      <h1 className="m-0" id="welcome-text">Welcome!</h1>
        <p className="m-4">회원가입을 축하드립니다. <br/>
          아이디와 비밀번호가 유출되지 않도록 주의해 주십시오.</p>
      <span className="p-2" id="inform-id-box" >회원님의 아이디는 <u>{user_email}</u>입니다.</span> 
      <p className="m-4 mb-5" id="alert">*회원정보는 안전하게 보호되며, 회원님의 동의 없이 공개 또는 제 3자에게 제공되지 않습니다.</p>
      <Button href="/">메인으로</Button>
    </div>
  );
}

const content = <WelcomeContent />

const Welcome = () => {
  return (
    <FormCard icon={faUserPlus} content={content} title={"회원가입"} />
  );
}

export default Welcome;