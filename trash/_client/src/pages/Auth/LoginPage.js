import { React } from "react";

import Page from "../../components/Page";
import LoginForm from '../../components/Auth/LoginForm';
import RightTitle from "../../components/RightTitle";

export default function LoginPage() {
  const rightInner = <LoginForm/>
  const rightTitle = <RightTitle 
            title={"로그인"}
            menu1={"HOME"}
            menu2={"멤버십"}
            menu3={"로그인"}
          />
  return (
      <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}