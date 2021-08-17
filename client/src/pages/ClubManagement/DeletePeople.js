import React from 'react';
import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import DeletePeople from "../../container/ClubManagement/DeletePeople";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';

const DeletePeoplePage = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Login" />
      <Header />
      <DeletePeople/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default DeletePeoplePage;



