import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import JoinForm from '../../components/JoinForm/JoinForm.jsx';
import WhiteBox from '../../components/WhiteBox/WhiteBox';

export default function LogIn() {
  return (
    <>
      <WhiteBox Content={
        <>
           <SectionTitle
              titleOption="section-title text-center mb-7"
              headingOption="title fz-28"
              title="회원가입"
              subTitle=""
            />
            <JoinForm />
          </>
      }
      />

    </>

  );
}