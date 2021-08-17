import React from 'react';
import { faPen } from "@fortawesome/free-solid-svg-icons";

import Page from '../../components/Page';
import RightTitle from '../../components/RightTitle';
import Kakao from '../../components/Map/Kakao';

export default function CreatePage() {
  const title="제휴사업 지도";
  const rightTitle = <RightTitle 
            title={title}
            menu1={"키움 이모저모"}
            menu2={"자유게시판"}
            menu3={title}
          />
  const rightInner = <Kakao/>

  return(
    <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}