import PropTypes from 'prop-types';
import React from 'react';

const HeaderSearch =  ({onClick}) => {

    return (
        <>
        <style>
            {`
                .header-search button:hover {
                    color: #94784d;
                }
                .header-search button i:hover {
                    color: #94784d; 
                }
            `}
        </style>
        <div className="header-search">
            <button className="header-search-toggle" onClick={onClick}><i className="pe-7s-search pe-2x pe-va"></i></button>
        </div>
        </>
    )
}
HeaderSearch.propTypes = {
    onClick: PropTypes.func
}
export default HeaderSearch
