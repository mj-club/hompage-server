import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import WhiteBox_Col1 from '../../components/WhiteBox/WhiteBox_Col1';

import { Link, useRouteMatch } from "react-router-dom";

export default function ScheduleManagement() {
  let { path } = useRouteMatch();
  return(
    <>
      <style>
        {`
          .Button_lnk{
            text-align:center;
          }
          .board-table {
            font-size: 13px;
            width: 100%;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
          }
          
          .board-table a {
            color: #333;
            display: inline-block;
            line-height: 1.4;
            word-break: break-all;
            vertical-align: middle;
          }
          .board-table a:hover {
            text-decoration: underline;
          }
          .board-table th {
            text-align: center;
          }
          
          .board-table th, .board-table td {
            padding: 14px 0;
          }
          
          .board-table tbody td {
            padding-left: 28px;
            padding-right: 14px;
            border-top: 1px solid #e7e7e7;
            text-align: center;
            color: #333;
            line-height: 1.4;
            vertical-align: middle;
          }

        `}
      </style>
      <WhiteBox_Col1
        Content1={
          <>
            <SectionTitle
              titleOption="section-title text-center mb-7"
              headingOption="title fz-28"
              title="OO 동아리 일정 관리"
              subTitle=""
            />
            <div id="board-list">
              <div className="container">
                <table className="board-table">
                  <thead>
                    <tr>
                      <th scope="col" className="th-num">시작 날짜</th>
                      <th scope="col" className="th-num">종료 날짜</th>
                      <th scope="col" className="th-title">내용</th>
                      <th scope="col" className="th-name">?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2021-08-15</td>
                      <td>2021-08-16</td>
                      <td>동아리 관리 페이지 개발 완료하기</td>
                      <td>?</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="row row-cols-lg-3 row-cols-1 align-items-center">
                <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300"/>
                <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300"/>
                <div className="col mt-lg-3" data-aos="fade-up" data-aos-delay="300">
                  <div className="Button_lnk">
                    <Link className="btn btn btn-hover-secondary mr-lg-3 mr-md-3 mr-3" to={path + "/add"}>일정 추가</Link>
                    <Link className="btn btn btn-hover-secondary" to={path + "/delete"}>일정 삭제</Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
