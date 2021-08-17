import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";


import Page from '../components/Page';
import RightTitle from '../components/RightTitle';
import Ipsum from '../components/Ipsum';

import BoardPage from './about/questions/ListPage';

export default function AboutPage() {
  let { path } = useRouteMatch();

  const title="총동연 소개";
  const rightTitle = <RightTitle 
            title={title}
            menu1={"HOME"}
            menu2={title}
            menu3={"소개"}
          />
  const rightInner = <Ipsum title={title}></Ipsum>

  return(
    <>
      <Switch>
        <Route exact path={path}>
          <Page rightInner={rightInner} rightTitle={rightTitle}/>
        </Route>
        <Route path={`${path}/questions`}>
          <BoardPage/>
        </Route>
      </Switch>
    </>
    
  );
}