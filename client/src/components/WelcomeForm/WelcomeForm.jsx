import React, {Fragment} from 'react';



const WelcomeForm = () => {
    return (
        <Fragment>
        <div className="agency-accordion max-mb-n30 mb-8">
            <label>
                홈페이지로 이동하셔서 자유롭게 이용하세요!
            </label>
        </div>
        <div className="col-12 text-center">
            <button className="btn btn-primary btn-hover-secondary">다음</button>
        </div>
        </Fragment>
    )
}

export default WelcomeForm;