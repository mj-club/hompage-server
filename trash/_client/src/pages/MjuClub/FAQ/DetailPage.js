import React from 'react';

import Page from '../../../components/Page';
import RightTitle from '../../../components/RightTitle';
import Detail from '../../../components/FAQ/Detail';

export default function CreatePage() {
  const title="FAQ";
  const rightTitle = <RightTitle 
            title={title}
            menu1={"동아리"}
            menu2={"FAQs"}
            menu3={title}
          />
  const rightInner = <Detail />

  return(
    <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}