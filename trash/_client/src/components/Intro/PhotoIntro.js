import React from 'react';
import PropTypes from "prop-types";

const PhotoIntro =  ({data}) => {
  return (
      
    <div className="intro-section overlay section" style={{backgroundImage: `url(${process.env.PUBLIC_URL + data.backgroundImage})`}}>

      <div className="container">
        <div className="row row-cols-lg-1 row-cols-1">

          <div className="col align-self-center">
            <div className="intro-content mt-xl-8 mt-lg-8 mt-md-8 mt-sm-8 mt-xs-8">
              <h2 className="title">{data.title1}</h2>
              <h2 className="title">{data.title2}</h2>
              <div className="desc">
                  <p>{data.desc}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
      
  )
}

PhotoIntro.propTypes = {
  data: PropTypes.object
};
  

export default PhotoIntro
