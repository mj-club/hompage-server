import React from 'react';
import YoutubeBackground from 'react-youtube-background';

const YoutubeIntro = () => {
  return (
    <YoutubeBackground
        videoId="WRgHyYuM9Xg"
        overlay="rgba(0,0,0,.4)"
        className="intro-section section bg-video"
        nocookie={true}
    >
      <div className="container">
        <div className="row row-cols-lg-1 row-cols-1">

          <div className="col align-self-center">
            <div className="intro-content-two text-center mt-xl-8 mt-lg-8 mt-md-8 mt-sm-8 mt-xs-8">
              <h2 className="title">Montly Key:um</h2>
              <div className="desc">
                  <p>MGH</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </YoutubeBackground>
  )
}

export default YoutubeIntro;
