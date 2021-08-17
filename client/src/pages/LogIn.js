import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Login from '../container/LogIn/LogIn';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const LogIn = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Login" />
      <Header />
      <Login/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default LogIn;



