import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

export default function Kakao() {
  const { kakao } = window;

  useEffect(() => {
    var container = document.getElementById('map');
    var options = { 
      center: new kakao.maps.LatLng(36.47914, 126.93519),
      level: 14
    };
    var map = new kakao.maps.Map(container, options);
  },[]);

  return(
    <>
      <style>
        {
          `#map {
            width: 900px;
            height: 800px;
          }`
        }
      </style>
      <Container id="map" className="mt-3 mb-5" ></Container>
    </>
  );
}