import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Page from '../../../components/Page';
import RightTitle from '../../../components/RightTitle';
import List from '../../../components/Board/List';

import CreatePage from './CreatePage';
import EditPage from './EditPage';
import DetailPage from './DetailPage';

export default function BulletinBoardPage() {
  let { path } = useRouteMatch();

  const title="문의사항";
  const rightTitle = <RightTitle 
            title={title}
            menu1={"총동연"}
            menu2={title}
            menu3={"목록"}
          />
  const rightInner = <List/>

  return(
    <>
      <Switch>
        <Route exact path={path}>
          <Page rightInner={rightInner} rightTitle={rightTitle}/>
        </Route>
        <Route path={`${path}/create`}>
          <CreatePage/>
        </Route>
        <Route path={`${path}/edit`}>
          <EditPage/>
        </Route>
        <Route path={`${path}/:id`}>
          <DetailPage />
        </Route>
      </Switch>
    </>
  );
}