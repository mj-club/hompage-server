import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Page from '../components/Page';
import RightTitle from '../components/RightTitle';
import Ipsum from '../components/Ipsum';
import AffiliationPage from './AboutKeyUm/AffiliationPage';

export default function AboutPage() {
  let { path } = useRouteMatch();

  const title="키움 이모저모";
  const rightTitle = <RightTitle 
            title={title}
            menu1={"HOME"}
            menu2={"멤버십"}
            menu3={title}
          />
  const rightInner = <Ipsum title={title}></Ipsum>

  return(
    <>
      <Switch>
        <Route exact path={path}>
          <Page rightInner={rightInner} rightTitle={rightTitle}/>
        </Route>
        <Route path={`${path}/affiliation`}>
          <AffiliationPage/>
        </Route>
      </Switch>
    </>
  );
}