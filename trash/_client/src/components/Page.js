import React from "react"
import { Container, Row, Col } from 'react-bootstrap';

import Navbar from "./Navbar";
import ImageExampleFluid from "./ImageExampleFluid";
import SubMenu from "./Submenu";
import MenuExampleCompact from '../components/menubars/Moviebar';
//submenu와 MenuExampleCompact 두가지 메뉴가 있으니, 원하시는 메뉴를 하단의 rightmenu를 보시고 각 page에서 import 하시면 됩니다!
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const Page = ({ rightTitle, rightInner, rightmenu }) => {
  return (
    <>
      <style>
        {
          `
        .item {
          font-family: "twayair";
        }
        `
        }
      </style>
      <Navbar />
      <Container>
        <Row>
          {isBrowser ? <ImageExampleFluid /> : null}
        </Row>
        {isBrowser ? console.log("borwser") : console.log("mobile")}
        {isBrowser ?
          // browser
          <Row>
            <Col className="item" xs="3">
               {rightmenu}
               // 원하는메뉴를 각 페이지별로 임포트 하셔서 사용하시면 됩니다!
            </Col>
            <Col className="item" xs="9">
              {rightTitle}
              {rightInner}
            </Col>
          </Row> :
          // mobile
          <Row>
            <Col className="item" style="font-famiily: 'twayair'">
              {rightInner}
            </Col>
          </Row>}
      </Container>
    </>
  );
}

export default Page;
