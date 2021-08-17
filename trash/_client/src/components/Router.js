import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from '../pages/Auth/LoginPage';
import JoinPage from '../pages/Auth/JoinPage';
import FindIdPwPage from '../pages/Auth/FindIdPwPage';
import JoinTermPage from "../pages/Auth/JoinTermPage";
import WelcomePage from "../pages/Auth/WelcomePage";
import MainPage from '../pages/MainPage';
import MjuClubPage from '../pages/MjuClubPage';
import PromotionPage from '../pages/PromotionPage';
import AboutKeyUmPage from '../pages/AboutKeyUmPage';
import MonthlyPage from '../pages/MonthlyPage';
import Page from "../components/Page";
import AboutClubUnion from "../pages/AboutClubUnion";
import DeleteAccountPage from '../pages/MyPage/DeleteAccountPage';
import ProfilePage from "../pages/MyPage/ProfilePage";
import Document_create from '../pages/Document_create';
import DocumentPage from '../pages/DocumentPage';

// Pages 로 이동
export default function Routers() {
  return(
    <Router>
      <>
        <Switch>
          {/* navbar menu route*/}
          <Route path="/about" component={AboutClubUnion}/>
          {/* club's pages */}  
          <Route path="/mju_club" component={MjuClubPage}/>

          <Route path="/promotion" component={PromotionPage}/>
          <Route path="/about_keyum" component={AboutKeyUmPage}/>
          <Route path="/monthly_keyum" component={MonthlyPage}/>
          <Route path="/Document" component={DocumentPage}/>
          <Route path="/Document_create" component = {Document_create}/>

          <Route path="/login" component={LoginPage}/>
          <Route path="/join" component={JoinPage}/>
          <Route path="/join_term" component={JoinTermPage}/>
          <Route path="/welcome" component={WelcomePage}/>
          <Route path="/find_id_pw" component={FindIdPwPage}/>
          <Route path="/delete_account" component={DeleteAccountPage} />
          <Route path="/page" component={Page}/>
          <Route path="/profile" component={ProfilePage} />
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}
