import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Image, Item } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import Ipsum from '../components/Ipsum';
import ImageExampleFluid from '../components/ImageExampleFluid';
import PageTitle from '../components/PageTitle';
import MenuExampleCompact from '../components/menubars/Moviebar';
import Footer from '../components/Footer/Footer';
import Videocard from '../components/Videocard';
import moment from 'moment';
import 'moment/locale/ko';
import Pagination_Month from './Pagination_mp';
import { useMediaQuery } from 'react-responsive'

export default function MonthlyPage() {
  const nowTime = moment().format("YYYY-MM-DD HH:mm:ss"); 
  const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

  return(
    <>
      <Navbar/>
      <Container>
        <Row>
          <ImageExampleFluid/>
        </Row>

        <br>
        </br>

        <Row>
          <PageTitle title={"Monthly-Key:um"}/>
        </Row>
        <br></br>
        <Row>
          <Col className="item" md="2">
            <MenuExampleCompact />
          </Col>
          <Col className="item" md="5">
            <Item.Group>
              <Item>
                <Videocard
                title ={"동영상1"}
                time = {nowTime}
                user ={"총동연 기획국"}
                watched = {"22 watched"}/>
              </Item>
              <Item>
                <Videocard
                  title ={"동영상2"}
                  time = {nowTime}
                  user ={"총동연 사무국"}
                  watched = {"44 watched"}/>
              </Item>

              <Item>
                <Videocard
                  title ={"동영상3"}
                  time = {nowTime}
                  user ={"총동연 협력국"}
                  watched = {"30 watched"}/>
              </Item>

            </Item.Group>
          </Col>
          <Col className ="item" md = "5">
            <Item.Group>
              <Item>
                <Videocard
                title ={"동영상1"}
                time = {nowTime}
                user ={"총동연 기획국"}
                watched = {"22 watched"}/>
              </Item>
              <Item>
                <Videocard
                  title ={"동영상2"}
                  time = {nowTime}
                  user ={"총동연 사무국"}
                  watched = {"44 watched"}/>
              </Item>

              <Item>
                <Videocard
                  title ={"동영상3"}
                  time = {nowTime}
                  user ={"총동연 협력국"}
                  watched = {"30 watched"}/>
              </Item>
            </Item.Group>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md = '4'>
          </Col>
          <Col md = '4'>
            <Pagination_Month />
          </Col>   
          <Col md = '4'>
          </Col>
        </Row>
        <br/>
      </Container>
      <Footer />
    </>
  );
}

