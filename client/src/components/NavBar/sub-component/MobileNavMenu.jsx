import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    getClosest,
    getSiblings,
    slideToggle,
    slideUp,
} from "../../../utils";

const MobileNavMenu = () => {
    const onClickHandler = (e) => {
        const target = e.currentTarget;
        const parentEl = target.parentElement;
        if (
            parentEl?.classList.contains("menu-toggle") ||
            target.classList.contains("menu-toggle")
        ) {
            const element = target.classList.contains("icon")
                ? parentEl
                : target;
            const parent = getClosest(element, "li");
            const childNodes = parent.childNodes;
            const parentSiblings = getSiblings(parent);
            parentSiblings.forEach((sibling) => {
                const sibChildNodes = sibling.childNodes;
                sibChildNodes.forEach((child) => {
                    if (child.nodeName === "UL") {
                        slideUp(child, 1000);
                    }
                });
            });
            childNodes.forEach((child) => {
                if (child.nodeName === "UL") {
                    slideToggle(child, 1000);
                }
            });
        }
    };
    return (
        <nav className="site-mobile-menu">
            <ul>
                <li>
                    <NavLink to={process.env.PUBLIC_URL + "/"}><span className="menu-text">총동연</span></NavLink>
                </li>
                <li className="has-children">
                    <NavLink to={process.env.PUBLIC_URL + "/about"}><span className="menu-text">동아리</span></NavLink>
                    <span className="menu-toggle" onClick={onClickHandler}><i className="icon far fa-angle-down"></i></span>
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
                    <span className="menu-toggle" onClick={onClickHandler}><i className="far fa-angle-down"></i></span>
                    <ul className="sub-menu">
                        <li><NavLink to={process.env.PUBLIC_URL + "/work"}><span className="menu-text">자유게시판</span></NavLink></li>
                        <li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">제휴사업 지도</span></NavLink></li>
                        <li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">제출서류 게시판</span></NavLink></li>
                        <li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">이벤트 게시판</span></NavLink></li>
                        <li><NavLink to={process.env.PUBLIC_URL + `/work-details/1`}><span className="menu-text">시설대관</span></NavLink></li>
                    </ul>
                </li>
                <li>
                    <NavLink to={process.env.PUBLIC_URL + "/"}><span className="menu-text">Montly-Key:Um</span></NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MobileNavMenu;
