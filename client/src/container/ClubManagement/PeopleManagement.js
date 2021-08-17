import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import WhiteBox_Col1 from '../../components/WhiteBox/WhiteBox_Col1';

import { Link, useRouteMatch } from "react-router-dom";

export default function PeopleManagement() {
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
              title="OO 동아리 인원 관리"
              subTitle=""
            />
            <div id="board-list">
              <div className="container">
                  <table className="board-table">
                      <thead>
                        <tr>
                          <th scope="col" className="th-num">학번</th>
                          <th scope="col" className="th-title">학과</th>
                          <th scope="col" className="th-name">이름</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>60181642</td>
                          <td>융합소프트웨어학부</td>
                          <td>박지원</td>
                        </tr>
                        <tr>
                          <td>60181642</td>
                          <td>융합소프트웨어학부</td>
                          <td>박지원</td>
                        </tr>
                        <tr>
                          <td>60181642</td>
                          <td>융합소프트웨어학부</td>
                          <td>박지원</td>
                        </tr>
                        <tr>
                          <td>60181642</td>
                          <td>융합소프트웨어학부</td>
                          <td>박지원</td>
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
                    <Link className="btn btn btn-hover-secondary mr-lg-3 mr-md-3 mr-3" to={path + "/add"}>인원 추가</Link>
                    <Link className="btn btn btn-hover-secondary" to={path + "/delete"}>인원 삭제</Link>
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
