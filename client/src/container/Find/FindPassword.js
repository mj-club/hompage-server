import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import FindPasswordForm from '../../components/FindForm/FindPasswordForm';
import WhiteBox from '../../components/WhiteBox/WhiteBox';

export default function FindPassword() {
  return(
    <>
      <style>
        {`
          .FindPasswordForm_hr{
            height:1px;
            margin:60px 0 50px 0;
            background:rgba(102,102,102,.2);
          }
          .FindPasswordForm_foot-lnk{
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
              title="비밀번호 찾기"
              subTitle=""
            />
            <FindPasswordForm />
            <div className="FindPasswordForm_hr"></div>
            <div className="FindPasswordForm_foot-lnk">
              <div className='row'>
                <div className="col" data-aos="fade-up">
                  <a href="/logIn">로그인</a>
                </div>
                <div className="col" data-aos="fade-up">
                  <a href="/findEmail">이메일 찾기</a>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}