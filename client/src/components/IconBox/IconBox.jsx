import PropTypes from "prop-types";
import React from 'react';
import ReactVivus from 'react-vivus';
import {Link} from "react-router-dom";

const IconBox = ({ data, classOption }) => {

    return (
        <>
        <style>
            {`
                .icon-box{
                    height: 100%;
                    color: #A99371;
                }

                .icon-box .content .link:hover {
                    color: #A99371;
                }

                #Layer_1{
                    color: #A99371;
                }
            `}
        </style>
        <div className={`icon-box text-center ${classOption}`}>
            <div className="icon">
                <ReactVivus
                    id={`servicesvg-${data.id}`}
                    option={{
                        file: data.icon,
                        animTimingFunction: 'EASE',
                            type: 'oneByOne',
                            delay: 80
                    }}
                />
            </div>
            <div className="content">
                <h3 className="title">{data.title}</h3>
                {
                    data.pageLink.map((name) => {
                        return (
                            <Link key={name} to={`/mjuclubpage/${name}`} className="link">| {name} | </Link>
                        );
                    })
                }
            </div>
        </div>
        </>
    )
}

IconBox.propTypes = {
    data: PropTypes.object,
    classOption: PropTypes.string
};

IconBox.defaultProps = {
    classOption: "icon-box text-center",
};

export default IconBox;


// const menus = ["Menu1", "Menu2", "Menu3", "Menu4"]
//         const menuList = menus.map((menu, index) => (<li key={index}>{menu}</li>));