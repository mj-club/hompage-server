import React from 'react';
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import Page from '../../../components/Page';
import RightTitle from '../../../components/RightTitle';
import FormCard from '../../../components/Auth/FormCard';
import EditForm from '../../../components/Board/EditForm';

export default function EditPage() {
  const title="글 수정하기";
  const rightTitle = <RightTitle 
            title={title}
            menu1={"키움 이모저모"}
            menu2={"자유게시판"}
            menu3={title}
          />
  const rightInner = <FormCard icon={faEdit} content={ <EditForm/> } title={title} />

  return(
    <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}