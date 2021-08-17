import React from 'react';

import JoinForm from '../../components/Auth/JoinForm';
import Page from "../../components/Page";
import RightTitle from '../../components/RightTitle';

export default function JoinPage() {
  const rightInner = <JoinForm />
  const rightTitle = <RightTitle 
            title={"회원가입"}
            menu1={"HOME"}
            menu2={"멤버십"}
            menu3={"회원가입"}
          />
  return(
    <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}