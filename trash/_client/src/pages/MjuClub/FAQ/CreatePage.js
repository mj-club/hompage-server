import React from 'react';
import { faPen } from "@fortawesome/free-solid-svg-icons";

import Page from '../../../components/Page';
import RightTitle from '../../../components/RightTitle';
import FormCard from '../../../components/Auth/FormCard';
import CreateForm from '../../../components/FAQ/CreateForm';

export default function CreatePage() {
  const title="FAQ 작성하기";
  const rightTitle = <RightTitle 
            title={title}
            menu1={"동아리"}
            menu2={"FAQs"}
            menu3={title}
          />
  const rightInner = <FormCard icon={faPen} content={ <CreateForm/> } title={title} />

  return(
    <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}