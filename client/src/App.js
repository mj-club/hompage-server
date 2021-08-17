import React, {useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AOS from "aos";
import NavScrollTop from './components/NavScrollTop';
import HomeOne from './pages/HomeOne';
import HomeTwo from './pages/HomeTwo';
import MjuClubPage from "./pages/MjuClubPage";
import HomeThree from './pages/HomeThree';
import About from './pages/About';
import Service from './pages/Service';
import Work from './pages/Work';
import WorkDetails from './pages/WorkDetails';
import BlogGrid from './pages/BlogGrid';
import BlogClassic from './pages/BlogClassic';
import BlogDetails from './pages/BlogDetails';
import BlogCategories from './pages/BlogCategories';
import BlogTag from './pages/BlogTag';
// import Contact from './pages/Contact';

import LogIn from './pages/LogIn';
import JoinTerm from './pages/JoinTerm';
import Welcome from './pages/Welcome';
import FindPassword from './pages/Find/FindPassword';
import ResetPassword from "./pages/Reset/ResetPw";
import findEmail from "./pages/Find/FindEmail";
import Join from './pages/Join';
import UnionNotice from './pages/ClubUnion/UnionNotice';
import ClubManagement from "./pages/ClubManagement";

// CSS File Here
import "aos/dist/aos.css";
import 'react-modal-video/scss/modal-video.scss';
import './assets/scss/style.scss';


function App() {
  useEffect(() => {
    AOS.init({
        offset: 80,
        duration: 1000,
        once: true,
        easing: 'ease',
    });
    AOS.refresh();
    
  }, [])
  return (
      <>
      {/* 메인 css가 안먹어서 홈페이지에 적용될 모든 a태그에 대한 스타일만 따로 지정해줌 */}
      <style>  
        {`
          a {
            color: gray;
            text-decoration: none; }
            a:hover {
              color: #A99371; }
        `}
      </style>
      <Router>
        <NavScrollTop>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL + "/"}`} exact component={HomeOne}/>
            <Route path={`${process.env.PUBLIC_URL + "/home-one"}`} exact component={HomeOne}/>
            <Route path={`${process.env.PUBLIC_URL + "/home-two"}`} component={HomeTwo}/>
            <Route path={`${process.env.PUBLIC_URL + "/home-three"}`} component={HomeThree}/>
            <Route path={`${process.env.PUBLIC_URL + "/about"}`} component ={About} />
            <Route path={`${process.env.PUBLIC_URL + "/service"}`} component ={Service} />
            <Route path={`${process.env.PUBLIC_URL + "/work"}`} component ={Work} />
            <Route path={`${process.env.PUBLIC_URL + "/work-details/:id"}`} component ={WorkDetails} />
            <Route path={`${process.env.PUBLIC_URL + "/blog-grid"}`} component ={BlogGrid} />
            <Route path={`${process.env.PUBLIC_URL + "/blog-classic"}`} component ={BlogClassic} />
            <Route path={`${process.env.PUBLIC_URL + "/tag/:slug"}`} component ={BlogTag} />
            <Route path={`${process.env.PUBLIC_URL + "/category/:slug"}`}component ={BlogCategories} />
            <Route path={`${process.env.PUBLIC_URL + "/blog-details/:id"}`}component ={BlogDetails} />
            <Route path={`${process.env.PUBLIC_URL + "/contact"}`} component ={LogIn} />
            <Route path={`${process.env.PUBLIC_URL + "/jointerm"}`} component ={JoinTerm} />
            <Route path={`${process.env.PUBLIC_URL + "/welcome"}`} component ={Welcome} />
            <Route path={`${process.env.PUBLIC_URL + "/logIn"}`} component ={LogIn} />
            <Route path={`${process.env.PUBLIC_URL + "/findPassword"}`} component ={FindPassword} />
            <Route path={`${process.env.PUBLIC_URL + "/mjuclubpage/:clubName"}`} component ={MjuClubPage} />
            {/* <Route component ={NotFound} /> */}
            <Route path={`${process.env.PUBLIC_URL + "/join"}`} component={Join} />
            <Route path={`${process.env.PUBLIC_URL + "/findEmail"}`} component ={findEmail} />
            <Route path={`${process.env.PUBLIC_URL + "/resetPW/:token"}`} component ={ResetPassword} />
            <Route path="/notice" component={UnionNotice} />
            <Route path={`${process.env.PUBLIC_URL + "/clubManagement"}`} component ={ClubManagement} />
          </Switch>
        </NavScrollTop>
      </Router>
      </>
  );
}

export default App;
