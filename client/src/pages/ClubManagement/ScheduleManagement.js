import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import ScheduleManagement from "../../container/ClubManagement/ScheduleManagement.js";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';

import AddSchedule from './AddSchedule';
import DeleteSchedule from './DeleteSchedule';

const ScheduleManagementPage = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <React.Fragment>
            <SEO title="Exomac || Management" />
            <Header />
            <ScheduleManagement/>
            <Footer />
            <ScrollToTop />
          </React.Fragment>
        </Route>
        <Route path={`${path}/add`}>
          <AddSchedule/>
        </Route>
        <Route path={`${path}/delete`}>
          <DeleteSchedule/>
        </Route>
      </Switch>
    </>
  )
}

export default ScheduleManagementPage;



