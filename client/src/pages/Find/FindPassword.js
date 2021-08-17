import React from 'react';
import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import FindPassword from '../../container/Find/FindPassword';
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';

const FindPW = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || FindPassword" />
      <Header />
      <FindPassword/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default FindPW;
