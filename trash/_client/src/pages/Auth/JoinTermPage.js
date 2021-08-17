import React from 'react';

import RightTitle from '../../components/RightTitle';
import JoinTerms from '../../components/Auth/JoinTerms'
import Page from '../../components/Page';

export default function JoinTermPage() {
  const title="회원 약관"
  const rightTitle = <RightTitle 
            title={title}
            menu1={"HOME"}
            menu2={"멤버십"}
            menu3={title}/>
  const rightInner = <JoinTerms />

  return (
    <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}