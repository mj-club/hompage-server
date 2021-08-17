import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import WhiteBox_Col1 from '../../components/WhiteBox/WhiteBox_Col1';
import SidebarSearch from '../../components/Sidebar/SidebarSearch.jsx';


export default function AddPeople() {

  function onClicked() {
    alert("Clicked!");
  }

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
          .search {
            margin-bottom: 10px;
          }
        `}
      </style>
      <WhiteBox_Col1
        Content1={
          <>
            <SectionTitle
              titleOption="section-title text-center mb-7"
              headingOption="title fz-28"
              title="OO 동아리 인원 추가"
              subTitle=""
            />
            <div className="mb-10">
              <SidebarSearch />
            </div>
            
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
                      <tr onClick={() => {onClicked()}}>
                        <td>60181642</td>
                        <td>융합소프트웨어학부</td>
                        <td>박지원</td>
                      </tr>
                    </tbody>
                </table>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
