import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import WhiteBox from '../../components/WhiteBox/WhiteBox';
import ResetPWForm from '../../components/Reset/ResetPW';


export default function Reset_Password() {
  return(
    <>
      <style>
        {`
          .resetPW_hr{
            height:1px;
            margin:60px 0 50px 0;
            background:rgba(102,102,102,.2);
          }
          .resetPW_foot-lnk{
            text-align:center;
          }
          #testtest{
            
          }
        `}
      </style>
      <WhiteBox
        Content={
          <>
            <SectionTitle
              titleOption="section-title text-center mb-7"
              headingOption="title fz-28"
              title="비밀번호 재설정"
              subTitle=""
            />
            <ResetPWForm />
            <div className="resetPW_hr"></div>
            <div className="resetPW_foot-lnk">
              <div className='row'>
                <div className="col" data-aos="fade-up">
                  <a href="/logIn">로그인</a>
                </div>
                <div className="col" data-aos="fade-up">
                  <a href="/findEmail">이메일 설정</a>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}