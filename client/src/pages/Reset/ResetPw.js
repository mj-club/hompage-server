import React from 'react';
import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';
import Reset_Password from '../../container/Reset/Reset_PW';

const ResetPassword = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Login" />
      <Header />
      <Reset_Password/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default ResetPassword;


