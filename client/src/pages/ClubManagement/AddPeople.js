import React from 'react';
import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import AddPeople from "../../container/ClubManagement/AddPeople";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';

const AddPeoplePage = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Login" />
      <Header />
      <AddPeople/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default AddPeoplePage;



