import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import IdFindForm from '../../components/FindForm/FindEmailForm';
import WhiteBox from '../../components/WhiteBox/WhiteBox';

export default function FindEmail() {
  return(
    <>
      <style>
        {`
          .LogInForm_hr{
            height:1px;
            margin:60px 0 50px 0;
            background:rgba(102,102,102,.2);
          }
          .LogInForm_foot-lnk{
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
              title="이메일 찾기"
              subTitle=""
            />
            <IdFindForm/>
            <div className="LogInForm_hr"></div>
            <div className="LogInForm_foot-lnk">
              <div className='row'>
                <div className="col-5" data-aos="fade-up">
                  <a href="/logIn">로그인</a>
                </div>
                <div className="col-7" data-aos="fade-up">
                  <a href="/findPassword">비밀번호 찾기</a>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
