import React from "react";

import Page from "../../components/Page";
import DeleteAccount from "../../components/MyPage/DeleteAccount"
import RightTitle from "../../components/RightTitle";

const DeleteAccountPage = () => {
  const title = "회원탈퇴"
  const rightTitle = <RightTitle title={title} menu1={title} menu2={title} menu3={title} />
  const rightInner = <DeleteAccount />
  return (
    <Page rightTitle={rightTitle} rightInner={rightInner}/>
  );
}

export default DeleteAccountPage;
