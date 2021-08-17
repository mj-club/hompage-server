import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import Jointerm from '../container/JoinTerm/JoinTerm';

const JoinTerm = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || JoinTerm" />
      <Header />
      <Jointerm/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default JoinTerm;