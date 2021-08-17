import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import WelCome from '../container/Welcome/Welcome';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const Welcome = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Welcome" />
      <Header />
      <WelCome/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default Welcome;



