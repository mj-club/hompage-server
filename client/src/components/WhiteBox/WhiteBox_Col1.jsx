import PropTypes from "prop-types";
import React from 'react';

const WhiteBox_Col1 = ({ Content1 }) => {
  return (
    <div className="section section-padding contact-section overlay-two" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg/contact-bg.jpg)`}}>
      <div className="container mt-20" id="testtest">
        <div className="row row-cols-lg-1 row-cols-1 align-items-center">
          <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300">
            <div className="contact-form-area">
              {Content1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WhiteBox_Col1.propTypes = {
  Content1: PropTypes.object
};
WhiteBox_Col1.defaultProps = {
  Content1: <div></div>
};

export default WhiteBox_Col1;
