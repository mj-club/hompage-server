import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import PeopleManagement from "../../container/ClubManagement/PeopleManagement.js";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';

import AddPeoplePage from './AddPeople';
import DeletePeoplePage from './DeletePeople';

const PeopleManagementPage = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <React.Fragment>
            <SEO title="Exomac || Management" />
            <Header />
            <PeopleManagement/>
            <Footer />
            <ScrollToTop />
          </React.Fragment>
        </Route>
        <Route path={`${path}/add`}>
          <AddPeoplePage/>
        </Route>
        <Route path={`${path}/delete`}>
          <DeletePeoplePage/>
        </Route>
      </Switch>
    </>
  )
}

export default PeopleManagementPage;



