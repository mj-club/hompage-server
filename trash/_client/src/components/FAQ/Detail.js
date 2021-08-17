import React from 'react';

export default function Detail() {
  return(
    <>
      <div className="blog-3 blog-details col" data-aos="fade-up">
        <div className="info">
          <h3 className="title">제목 테스트</h3>
          <div className="desc" dangerouslySetInnerHTML={{__html: "value"}} />
        </div>
      </div>
    </>
  );
}