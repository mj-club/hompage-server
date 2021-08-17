import React from 'react';

const NoticeBoard = () => {
  return (
    <>
    <style type="text/css">
      {`
      .col-10 {
        text-align : center;
      }
      `}
    </style>
    <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col" className="col-10">내용</th>
        <th scope="col">작성자</th>
        <th scope="col">날짜</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td colSpan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table> 
</>
  );
};

export default NoticeBoard;