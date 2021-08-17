

import Page from '../components/Page';
import RightTitle from '../components/RightTitle';
import Ipsum from '../components/Ipsum';

// export default function MjuClubPage() {
//   const title="mju_club"
//   const rightTitle = <RightTitle 
//             title={title}
//             menu1={"동아리"}
//             menu2={title}
//             // menu3={title}
//           />
//   const rightInner = <Ipsum title={title}></Ipsum>

//   return(
//      <Page rightInner={rightInner} rightTitle={rightTitle}/>
//   );
// }



import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import React, { useEffect } from "react";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Breadcrumb from "../containers/Breadcrumb/Breadcrumb";
import AboutFour from "../containers/About/AboutFour";
import Video from "../containers/Video/Video";
import AboutFive from "../containers/About/AboutFive";
import TestimonialContainer from "../containers/Testimonial/TestimonialContainer";
import CallToActionTwo from "../containers/CallToAction/CallToActionTwo";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop.jsx";
import axios from "axios";


const MjuClubPage = () => {
  let { path } = useRouteMatch();

  useEffect(() => {
    axios.get("/");
  });

  function searchApi() {
    const url = "http://13.209.214.244:8080";
    axios
      .get(url + "/read/")
      .then(function (response) {
        setPhotos(response.data);
        console.log("성공");
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  searchApi();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <React.Fragment>
            <SEO title="동아리 || {동아리이름}" />
            <Navbar />
            <Breadcrumb
              image="images/bg/breadcrumb-bg.jpg"
              title="We are an agency located in New York"
              content="Home"
              contentTwo="About Us"
            />
            <AboutFour />
            <Video />
            <AboutFive />
            <TestimonialContainer classOption="bg-primary-blue" />
            <CallToActionTwo />
            <ScrollToTop />
            <Footer />
          </React.Fragment>
        </Route>
        {/* <Route path={`${path}/FAQs`}>
          <FAQPage />
        </Route> */}
      </Switch> 
    </>
  );
};

export default MjuClubPage;

// Req.body(사용자 입력 필요)
// brief_introduction: 동아리 한 줄 소개
// contact_number: 연락처
// sns_type: sns 종류(ex> facebook, youtube, kakao 오픈 챗팅, Instagram 등)
// sns_link: sns 링크
// join_type: 가입방식(ex> 네이버 폼, 문자지원, 전화지원 등)
// join_path: 가입 경로(ex> 네이버 폼인 경우 -> 폼 링크, 문자지원인 경우 -> 전화번호)
// introduction: 동아리 소개
// meeting: 정기 모임 (ex> “매주 목요일 18시 / 주 1회 / 시험기간 변동 가능”)
// name: 동아리 이름
// plan: 활동 계획
// recruit: 모집기간 (ex> “2021년 3월 8일 – 2021년 3월 22일 자정”)
// recruitment: 동아리 홍보멘트(신입회원 모집안내)
// representation: 회장이름
