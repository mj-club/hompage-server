import React from 'react';
import PropTypes from "prop-types"
import {Link} from "react-router-dom";


const Btn = (props) => {
    return (
    <>
    <style>
        {`
            // .btn-light {
            //     border-color: #fff;
            //     background-color: #fff;
            //     color: #A99371;
            //     border-radius: 8px;
            // }

            // .btn-light:hover, .btn-light:focus {
            //     border-color: transparent;
            //     background-color: #A99371;
            //     color: #ffffff;  
            // }

            .btn .btn-light .btn-hover-primary{
                color: #A99371;
            }
            
        `}
    </style>
        <React.Fragment>
            <Link to={process.env.PUBLIC_URL + "/"} className="btn btn-light btn-hover-primary">{props.name}</Link>
        </React.Fragment>
      </>
    )
}

Btn.propTypes = {
    name: PropTypes.string
}

export default Btn
