import React from "react";
import {Form, Table, Button} from "react-bootstrap";
// import "../../style/DeleteAccount.css";

const DeleteAccount = () => {

  const validDelete = () => {
    //아이디와 비밀번호가 맞는지 확인

    //입력 비밀번호와 비밀번호 확인이 맞는지 확인
    const pw = document.getElementById("pw");
    const checkPw = document.getElementById("check-pw");
    if(pw.value !== checkPw.value){
      alert("비밀번호를 다시 확인해주세요.");
      return;
    }
    const value = window.confirm("정말 탈퇴하시겠습니까?");
    alert(value);
  }

  return(
    <>
    <style>
      {`
      td{
        border: 0px;
      }
      `}
    </style>
    <p>회원탈퇴 하시려면, 비밀번호를 입력하신 후, 회원탈퇴 버튼을 눌러주세요.</p>
      <Table>
        <tbody>
          <tr>
            <td>
            <Form>
              <Form.Label>아이디 정보</Form.Label>
              <Form.Control placeholder="jisu1234@mju.ac.kr" readOnly />

              <Form.Label>비밀번호</Form.Label>
              <Form.Control id="pw" type="password" />

              <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control id="check-pw" type="password" />

                <div className="text-center">
                  <Button className="m-3" onClick={validDelete}>회원탈퇴</Button>
                </div>

              </Form>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default DeleteAccount;