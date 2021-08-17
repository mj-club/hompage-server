import React from 'react';
import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import AddSchedule from "../../container/ClubManagement/AddSchedule";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';

const AddSchedulePage = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Login" />
      <Header />
      <AddSchedule/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default AddSchedulePage;



