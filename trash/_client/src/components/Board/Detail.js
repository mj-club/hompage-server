import React from 'react';
import {Link} from "react-router-dom";
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

export default function Detail() {

  return(
    <>
      <div className="blog-3 blog-details col" data-aos="fade-up">
        <div className="thumbnail">
          <img className="w-100" src={`${process.env.PUBLIC_URL}/images/hero-1.jpg`} alt="Blog Image" />
        </div>
        <div className="info">
          <h3 className="title">제목 테스트</h3>
          <div className="desc" dangerouslySetInnerHTML={{__html: "value"}} />
          <ul className="meta mb-0 mt-12">
            <li><i className="fal fa-pencil-alt"></i>작성자</li>
            <li><i className="far fa-calendar"></i>작성일</li>
            <li><i className="fas fa-comments"></i>4 Comments</li>
            <li className="media"><Link to={process.env.PUBLIC_URL + "/"}><i className="fas fa-share-alt"></i>Share this post</Link>
              <div className="list">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                <a href="https://www.tumblr.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-tumblr-square"></i></a>
              </div>
            </li>
          </ul>
        </div>
        <Row  className="justify-content-md-center mt-5">
          <Col sm={10}>
            <InputGroup>
              <FormControl as="textarea" aria-label="With textarea" placeholder="댓글을 입력하세요."/>
            </InputGroup>
          </Col>
          <Col sm={2}>
            <Button variant="primary" type="submit">
              저장하기
            </Button>
          </Col>
        </Row>
        <div className="entry-author mt-3">
          <div className="author-info">
            <div className="author-description">
              <h6 className="author-name">Eloise Smith</h6>
              <div className="author-biographical-info">
                  She is a lawyer, podcaster, speaker, and writer. As an educational content director, she helps develop HasThemes  premium training products.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}