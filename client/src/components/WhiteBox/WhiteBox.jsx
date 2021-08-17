import PropTypes from "prop-types";
import React from 'react';

const WhiteBox = ({ Content }) => {
  return (
    <div className="section section-padding contact-section overlay-two" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg/contact-bg.jpg)`}}>
      <div className="container mt-20" id="testtest">
        <div className="row row-cols-lg-3 row-cols-1 align-items-center">
          <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300"></div>
          <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300">
            <div className="contact-form-area">
              {Content}
            </div>
          </div>
          <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300"></div>
        </div>
      </div>
    </div>
  );
}

WhiteBox.propTypes = {
  Content: PropTypes.object
};
WhiteBox.defaultProps = {
  Content: <div></div>
};

export default WhiteBox;
