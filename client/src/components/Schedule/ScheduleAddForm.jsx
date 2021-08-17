import React, {Fragment} from 'react';
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { emailLogin } from "../../actions";

const ScheduleAddForm = () => {
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
            <label>Start date</label>
            <div className="col-md-6 col-6 mb-4">
              <input type="date" placeholder="시작 일자 *" name="start" ref={register({
                required: '시작 일자는 필수입니다.',
              })} />
              
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <label>End date</label>
            <div className="col-md-6 col-6 mb-4">
              <input type="date" placeholder="시작 일자 *" name="start" ref={register({
                required: '시작 일자는 필수입니다.',
              })} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="col-md-12 col-12 mb-4">
              <input type="text" placeholder="내용 *" name="description" ref={register({ required: '내용은 필수입니다.' })} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="col-12 text-center mb-4">
              <button className="btn btn-primary btn-hover-secondary">추가하기</button>
            </div>
          </div>
        </form>
        <p className="form-messege"></p>
        </Fragment>
    )
}

export default ScheduleAddForm;
