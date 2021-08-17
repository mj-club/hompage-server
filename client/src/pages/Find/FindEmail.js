import React from 'react';
import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';
import _FindEmail from '../../container/Find/FindEmail';

const FindEmail = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Login" />
      <Header />
      <_FindEmail />
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default FindEmail;



