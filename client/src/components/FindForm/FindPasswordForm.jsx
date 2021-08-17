import React, {Fragment} from 'react';
import { useForm } from "react-hook-form";
import {findPassword} from "../../actions";
import { useDispatch } from "react-redux";
import { emailLogin } from "../../actions";

const FindPasswordForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
      mode: "onBlur"
  });

  const onSubmit = (data) => {
    const body = data;
    dispatch(findPassword(body));
    dispatch(emailLogin(body));
  }


    
  return (
    <Fragment>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-n4">
        <div className="col-md-12 col-12 mb-4">
          <input type="email" placeholder="Email *" name="email" ref={register({
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"
            }
          })} />
            {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="col-md-12 col-12 mb-4">
          <input type="text" placeholder="이름 *" name="name" ref={register({
            required: 'Name is required'
          })} />
            {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="col-md-12 col-12 mb-4">
          <input type="text" placeholder="핸드폰 번호 *" name="phone" ref={register({
            required: 'Phone Number is required',
            pattern: {
              value: /^\d{3}\d{3,4}\d{4}$/,
              message: "invalid phone number"
            }
          })} />
            {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div className="col-12 text-center mb-4">
          <button className="btn btn-primary btn-hover-secondary">비밀번호 찾기</button>
        </div>
      </div>
    </form>
    <p className="form-messege"></p>
    </Fragment>
  )
}

export default FindPasswordForm;
