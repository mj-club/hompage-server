import React from 'react'
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    return (
        <>
        <style>
            {`
                .menu-text {
                    font-size: 18px;
                }
               .site-main-menu > ul > li:hover > a {
                    color: #FFEF96;
                }
                .site-main-menu .sub-menu li:hover > a, .site-main-menu .sub-menu li.active > a, .site-main-menu .mega-menu li:hover > a, .site-main-menu .mega-menu li.active > a {
                    color: #111111; 
                }
                    
                    
            `}
        </style>    
        <nav className="site-main-menu">
            <ul>
                <li>
                    <NavLink to={process.env.PUBLIC_URL + "/"}><span className="menu-text">총동연</span></NavLink>
                </li>
                <li className="has-children">
                    <NavLink to={process.env.PUBLIC_URL + "/about"}><span className="menu-text">동아리</span></NavLink>
                    <span className="menu-toggle"><i className="far fa-angle-down"></i></span>
                    <ul className="sub-menu">
                        <li><NavLink to={process.env.PUBLIC_URL + "/home-one"}><span className="menu-text">동아리방 지도</span></NavLink></li>
                        <li><NavLink to={process.env.PUBLIC_URL + "/service"}><span className="menu-text">동아리 소개</span></NavLink></li>
                    </ul>
                </li>
                <li>
                    <NavLink to={process.env.PUBLIC_URL + "/work"}><span className="menu-text">청원게시판</span></NavLink>
                </li>
                <li className="has-children">
                    <NavLink to={process.env.PUBLIC_URL + "/work"}><span className="menu-text">키움 이모저모</span></NavLink>
                    <span className="menu-toggle"><i className="far fa-angle-down"></i></span>
                    <ul className="sub-menu">
                        <li><NavLink to={process.env.PUBLIC_URL + "/work"}><span className="menu-text">자유게시판</span></NavLink></li>
                        <li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">제휴사업 지도</span></NavLink></li>
                        <li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">제출서류 게시판</span></NavLink></li>
                        <li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">이벤트 게시판</span></NavLink></li>
                        <li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">시설대관</span></NavLink></li>
                    </ul>
                </li>
                <li>
                    <NavLink to={process.env.PUBLIC_URL + "/"}><span className="menu-text">Monthly-Key:Um</span></NavLink>
                </li>
            </ul>
        </nav>
     </>
    )
}

export default NavBar


// 메뉴바 색상 #A99371

// 메뉴바 글씨는 흰색/ 클릭하면 색 바뀌게하기 #FFEF96

// 메뉴바 폰트IBM Plex Sans KR SemiBold

// 클릭하면 IBM Plex Sans KR Bold로 더 두껍게 표시