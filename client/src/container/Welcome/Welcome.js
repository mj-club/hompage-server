import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import WelcomeForm from '../../components/WelcomeForm/WelcomeForm';

export default function Welcome() {
  return(
    <>
      <div className="section section-padding contact-section overlay-two" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg/contact-bg.jpg)`}}>
        <div className="container mt-20">
            <div className="row row-cols-2 align-items-center">
                <div className="col-3" data-aos="fade-up">
                    
                </div>
                <div className="col-6 mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300">
                    <div className="contact-form-area">
                        <SectionTitle
                            titleOption="section-title text-center mb-7"
                            headingOption="title fz-28"
                            title="환영합니다!"
                            subTitle="회원님의 아이디는 rlagnlwnsvv@naver.com 입니다."
                        />
                        <WelcomeForm />
                    </div>
                </div>
                <div className="col-3" data-aos="fade-up">
                    
                </div>
            </div>
        </div>

      </div>
    </>
    
  );
}