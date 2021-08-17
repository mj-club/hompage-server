import React from "react";
import Page from "../../components/Page";
import RightTitle from "../../components/RightTitle";
import Profile from "../../components/MyPage/Profile";

const ProfilePage = () => {
  const title = "개인정보"
  const rightTitle = <RightTitle title={title} menu1={title} menu2={title} menu3={title} />
  const rightInner = <Profile />
  return (
    <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}

export default ProfilePage;
