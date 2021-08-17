import React from 'react';
import '../Table/Table.css';

export default function Table() {
  return(
    <>
      <h1><span className="blue"></span> Q&A Table<span className="blue"></span></h1>

      <table className="container">
        <thead>
          <tr>
            <th><h1>NO</h1></th>
            <th><h1>SUBJECT</h1></th>
            <th><h1>WRITER</h1></th>
            <th><h1>DATE</h1></th>
          </tr>
        </thead>
        <tbody className = "body">
        <tr>
          <td>1</td>
          <td><a href="/">how to enroll union?</a></td>
          <td>KIM</td>
          <td>2021-08-12</td>
        </tr>
        <tr>
          <td>2</td>
          <td>how to abolish the union?</td>
          <td>PARK</td>
          <td>2021-08-12</td>
        </tr>
        <tr>
          <td>3</td>
          <td>how to write the documents?</td>
          <td>LEE</td>
          <td>2021-08-13</td>
        </tr>
        <tr>
          <td>4</td>
          <td>how to get financial support?</td>
          <td>JEONG</td>
          <td>2021-08-14</td>
        </tr>
        <tr>
          <td>5</td>
          <td>how to lent facilities?</td>
          <td>BONG</td>
          <td>2021-08-15</td>
        </tr>
        <tr>
          <td>6</td>
          <td>how to find my ID/PW?</td>
          <td>YOON</td>
          <td>2021-08-16</td>
        </tr>
    </tbody>
      </table>
    </>
  )
}