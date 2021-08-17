import React from "react";
import SEO from "../components/SEO";
import PropTypes from "prop-types";
import Header from "../partials/header/Header";
import Breadcrumb from "../container/Breadcrumb/Breadcrumb";
import Footer from "../container/Footer/Footer";
import WorkData from "../data/work/workDetails.json";
import WorkDetailsContainer from "../container/Work/WorkDetailsContainer";
import ScrollToTop from "../components/ScrollToTop.jsx";
// import WorkDetails from './WorkDetails';

import { useDispatch, useSelector } from 'react-redux';
import { clubInfo } from '../actions/clubActions';

const MjuClubPage = ({match}) => {
    const dispatch = useDispatch();
    dispatch(clubInfo(match.params.clubName));
    
    const clubName = useSelector(state => state.clubReducer.name);

    return (
        <React.Fragment>
            <SEO title={clubName} />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-two.jpg"
                title={clubName}
                content="Home"
                contentTwo={clubName}
            />
            <WorkDetailsContainer data={WorkData[0]} />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

MjuClubPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      clubName: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
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
