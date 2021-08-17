import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import ServiceIconBoxTwo from '../container/service/ServiceIconBoxTwo';
import ScrollToTop from '../components/ScrollToTop.jsx';


const Service = () => {
    return (
        <React.Fragment>
            <SEO title="동아리 || 동아리소개" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-three.jpg"
                title="명지대학교의 동아리들을 소개합니다!"
                content="Home"
                contentTwo="동아리 소개"
            />
            <ServiceIconBoxTwo />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Service;



