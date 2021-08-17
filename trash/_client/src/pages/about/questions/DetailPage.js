import React from 'react';

import Page from '../../../components/Page';
import RightTitle from '../../../components/RightTitle';
import Detail from '../../../components/Board/Detail';


export default function DetailPage() {
  const title="N번 게시물";
  const rightTitle = <RightTitle 
            title={title}
            menu1={"키움 이모저모"}
            menu2={"자유게시판"}
            menu3={title}
          />
  const rightInner = <Detail/>

  return(
    <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}