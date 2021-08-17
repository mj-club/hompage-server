import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import JoinContainer from "../container/Join/Join";
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const Join = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Join" />
      <Header />
      <JoinContainer />
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default Join;



