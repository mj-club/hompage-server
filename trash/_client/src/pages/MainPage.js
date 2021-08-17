import React from 'react';

import Navbar from '../components/Navbar';
import IntroSlider from '../containers/IntroSlider/IntroSlider';
import Footer from '../components/Footer/Footer';

import '../style/MainPage.css';

export default function MainPage() {
  return(
    <>
      <Navbar/>
      <IntroSlider/>
      <Footer/>
    </>
  );
}