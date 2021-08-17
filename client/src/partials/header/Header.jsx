import React, {Fragment, useState, useEffect} from "react";
import Logo from '../../components/logo/Logo';
import NavBar from '../../components/NavBar/NavBar';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import MobileMenu from "../../components/NavBar/MobileMenu";
import MainSearch from "../../components/NavBar/MainSearch";

import { Link } from "react-router-dom";

// import { useSelector } from "react-redux";

const Header = () => {
    // const user = useSelector((state) => state.authReducer.user);

    const [ofcanvasShow, setOffcanvasShow] = useState(false);
    const onCanvasHandler = () => {
        setOffcanvasShow(prev => !prev);
    }
    const [searchbarShow, setSearchbarShow] = useState(false);
    const onSearchHandler = () => {
        setSearchbarShow(prev => !prev);
    }
    const [scroll, setScroll] = useState(0);
    const [headerTop, setHeaderTop] = useState(0);

    useEffect(() => {
        const header = document.querySelector(".header-section");
        setHeaderTop(header.offsetTop);
        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    return (
        <>
        <style>
            {
            `   
                .header-section.is-sticky .header-inner{
                    background-color: #A99371 !important;
                }

               .col-xl-2 col-auto order-0{
                    display: flex !important;
                }

                .loginBtn {
                    border-color: #fff;
                    background-color: #fff;
                    color: #A99371;
                    border-radius: 8px;
                }

                .btn-hover-secondary:hover, .btn-hover-secondary:not(:disabled):not(.disabled).active {
                    border-color: transparent;
                    background-color: #A99371;
                    color: #ffffff;
                }

                
                
                .btn-outline-white {
                    border-color: transparent;
                    color: #A99371;
                    border-color: #fff;
                    border-radius: 8px;
                    
                }

                .btn-outline-white:hover {
                    background-color: #A99371;
                    
                }
                    
            `
            }
        </style> 
        <Fragment>
            <div className={`header-section header-transparent sticky-header section ${
        scroll > headerTop ? "is-sticky" : ""
      }`}>
                <div className="header-inner">
                    <div className="container position-relative">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-xl-2 col-auto order-0">
                                <Logo 
                                    image={`${process.env.PUBLIC_URL}/images/logo/keyum-logo.png`}   // 키움 이미지만 안뜸 images/logo/keyum-logo.png
                                />
                            </div>
                            <div className="col-auto col-xl d-flex align-items-center justify-content-xl-center justify-content-end order-2 order-xl-1">
                                <div className="menu-column-area d-none d-xl-block position-static">
                                    <NavBar />
                                </div>
                                <div className="header-search-area ml-xl-7 ml-0">

                                    <HeaderSearch onClick={onSearchHandler}/>
                                </div>

                                <div className="header-mobile-menu-toggle d-xl-none ml-sm-2">
                                    <button type="button" className="toggle" onClick={onCanvasHandler}>
                                        <i className="icon-top"></i>
                                        <i className="icon-middle"></i>
                                        <i className="icon-bottom"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-xl-2 col d-none d-sm-flex justify-content-end order-1 order-xl-2">
                                <Link className="btn btn-primary btn-hover-secondary loginBtn" to={process.env.PUBLIC_URL + "/logIn"}>로그인 / 회원가입</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MobileMenu show={ofcanvasShow} onClose={onCanvasHandler}/>
            <MainSearch show={searchbarShow} onClose={onSearchHandler}/>
        </Fragment>
     </>
    )
}

export default Header;