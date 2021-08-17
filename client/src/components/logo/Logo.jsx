import PropTypes from "prop-types";
import React from 'react';
import {Link} from "react-router-dom";


const Logo = ({image}) => {
    return(
        <>
        {/* <style>
            {`
                .header-logo{
                    display: flex;
                    width: 400px;
                    align-items: center;
                    margin-right: 100px;
                    color: #000;
                    font-weight: bold;
                    font-size: 20px;
                }

                @media only screen and (max-width: 479px) {
                    .header-logo{
                        display: table-cell;
                        vertical-align: middle;
                    }
                }
            `}
        </style> */}
        <div className="header-logo">
            <Link to={process.env.PUBLIC_URL + "/"}>
                <img src={process.env.PUBLIC_URL + image} alt="Logo" />
            </Link>
        </div>
        </>
    )
}

Logo.propTypes = {
    image: PropTypes.string
};

export default Logo;
