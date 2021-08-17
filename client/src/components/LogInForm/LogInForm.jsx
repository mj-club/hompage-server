import React, {Fragment} from 'react';
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { emailLogin } from "../../actions";

const LogInForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
      mode: "onBlur"
  });
  const onSubmit = (data) => {
    const body = data;
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
              <input type="password" placeholder="Password *" name="password" ref={register({ required: 'Password is required' })} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="col-12 text-center mb-4">
              <button className="btn btn-primary btn-hover-secondary">로그인</button>
            </div>
          </div>
        </form>
        <p className="form-messege"></p>
        </Fragment>
    )
}

export default LogInForm;
