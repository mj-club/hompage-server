import React from 'react';
import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import DeleteSchedule from "../../container/ClubManagement/DeleteSchedule";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';

const DeleteSchedulePage = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Login" />
      <Header />
      <DeleteSchedule/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default DeleteSchedulePage;



