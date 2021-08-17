import PropTypes from "prop-types";
import React from 'react';

const WhiteBox_Col2 = ({ Content1, Content2 }) => {
  return (
    <div className="section section-padding contact-section overlay-two" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg/contact-bg.jpg)`}}>
      <div className="container mt-20" id="testtest">
        <div className="row row-cols-lg-2 row-cols-1 align-items-center">
          <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300">
            <div className="contact-form-area">
              {Content1}
            </div>
          </div>
          <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300">
            <div className="contact-form-area">
              {Content2}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WhiteBox_Col2.propTypes = {
  Content1: PropTypes.object,
  Content2: PropTypes.object
};
WhiteBox_Col2.defaultProps = {
  Content1: <div></div>,
  Content2: <div></div>
};

export default WhiteBox_Col2;
