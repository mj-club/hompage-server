import React, {Fragment, useState } from 'react';
import { useForm } from "react-hook-form";
import { resetPW } from '../../actions';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router';

const ResetPWForm = () => {
  const dispatch = useDispatch();
  const {token} = useParams();
  const { register, handleSubmit, errors} = useForm({
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    const body = data;
    dispatch(resetPW(token, body));
  }


  const [firstPW, setFirstPW] = useState(null);
  const [secondPW, setSecondPW] = useState(null);

 

  return(
    <Fragment>
    <form onSubmit = {handleSubmit(onSubmit)}>
      <div className ="row mb-n4">
        <div className = "col-md-12 col-12 mb-4">
          <input type = "text" placeholder="변경할 비밀번호 *" name="newPW" ref={register({
            required: 'New Password is required',
            pattern: {
              value: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/,
              message: "please input the password using numbers, alphabets and symbols"
            }
          })} onChange={
            ({ target: { value } }) => setFirstPW(value)}
          />
            {errors.newPW && <p>{errors.newPW.message}</p>}
        </div>
        <div className = "col-md-12 col-12 mb-4">
          <input type = "text" placeholder="비밀번호 재입력 *" name="newPW_2" ref={register({
            required: 'Press new password again',
            pattern: {
              value: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/,
              message: "please input the password again",
            }
          })} onChange={
            ({ target: { value } }) => setSecondPW(value)}
          />
            {errors.newPW_2 && <p>{errors.newPW_2.message}</p>}
            {firstPW !== secondPW && <p>please input the same password</p>}
        </div>
        <div className="col-12 text-center mb-4">
          <button className="btn btn-primary btn-hover-secondary" >
            비밀번호 재설정
            </button>
        </div>

      </div>
    </form>
    <p className="form-messege"></p>
    </Fragment>
  )
}

export default ResetPWForm;
