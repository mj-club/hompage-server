import React from 'react';
import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import Breadcrumb from '../../container/Breadcrumb/Breadcrumb';
import WorkContainer from '../../container/Work/WorkContainer';
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';


const Work = () => {
    return (
        <React.Fragment>
            <SEO title="Exomac || Work" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-two.jpg"
                title="We work with bold brands that we believe in"
                content="Home"
                contentTwo="Work"
            />
            <WorkContainer />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Work;