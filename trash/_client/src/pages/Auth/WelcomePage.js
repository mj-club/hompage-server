import React from 'react';

import Page from '../../components/Page';
import RightTitle from '../../components/RightTitle';
import Welcome from "../../components/Auth/Welcome";

export default function MjuClubPage() {
  const title="회원가입"
  const rightTitle = <RightTitle 
            title={title}
            menu1={"HOME"}
            menu2={"멤버십"}
            menu3={title}
          />
  const rightInner = <Welcome title={title}></Welcome>

  return(
     <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}