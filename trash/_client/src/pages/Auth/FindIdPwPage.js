import React from 'react';

import Page from '../../components/Page';
import RightTitle from '../../components/RightTitle';
import Ipsum from '../../components/Ipsum';

export default function FindIdPwPage() {
  const rightTitle = <RightTitle 
            title={"ID/PW찾기"}
            menu1={"HOME"}
            menu2={"멤버십"}
            menu3={"ID/PW찾기"}
          />
  const rightInner = <Ipsum title="ID/PW찾기"></Ipsum>

  return(
     <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}