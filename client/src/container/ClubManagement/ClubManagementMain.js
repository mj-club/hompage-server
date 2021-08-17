import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import WhiteBox from '../../components/WhiteBox/WhiteBox';

import { Link, useRouteMatch } from "react-router-dom";

export default function ClubManagementMain() {
  let { path } = useRouteMatch();
  return(
    <>
      <style>
        {`
          .LogInForm_hr{
            height:1px;
            margin:60px 0 50px 0;
            background:rgba(102,102,102,.2);
          }
          .Button_lnk{
            text-align:center;
          }
        `}
      </style>
      <WhiteBox
        Content={
          <>
            <SectionTitle
              titleOption="section-title text-center mb-7"
              headingOption="title fz-28"
              title="일정 관리"
              subTitle=""
            />
            <div className="Button_lnk">
              <Link className="btn btn-primary btn-hover-secondary" to={path + "/schedule"}>바로가기</Link>
            </div>
            <div className="LogInForm_hr"></div>
            <SectionTitle
              titleOption="section-title text-center mb-7"
              headingOption="title fz-28"
              title="인원 관리"
              subTitle=""
            />
            <div className="Button_lnk">
              <Link className="btn btn-primary btn-hover-secondary" to={path + "/people"}>바로가기</Link>
            </div>
          </>
        }
      />
    </>
  );
}
