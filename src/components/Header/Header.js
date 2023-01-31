import React, { useRef } from "react";
import { useNavigation } from "react-router-dom";
import { Container } from "reactstrap";
import CustomButton from "../CustomButton";
import "./header.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutD } from "../../redux/apiCalls";
import styled from "styled-components";
var currentUserUid;

const navLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "Reports",
    url: "/reports",
  },

  {
    display: "Courses",
    url: "/courses",
  },
  {
    display: "Exams",
    url: "/dashboard",
  },
];
const Logo = styled.div`
  font-family: "Square Peg", cursive;
  font-size: 32px;
  font-weight: 600;
  cursor: pointer;
  color: #00adb5;
  border-radius: 10%;
`;
const Header = () => {
  const menuRef = useRef();
  const userId = useSelector((state) => state.user.currentUser);
  console.log("tttttttttttttthr", userId);
  if (userId == null) {
    console.log("no aut userrrh");
  } else {
    currentUserUid = userId.user._id;
  }

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("yyyyyyyyyyyyyy");
    logoutD(dispatch);
  };
  const redirectTo = () => {};
  console.log("uu", userId);
  return (
    <header
      className="header"
      style={{ paddingLeft: "80px", paddingRight: "80px" ,backgroundColor:""}}
    >
      <>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <Logo>E-learning</Logo>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right">
              <a href={!userId ? "https://elearning-w.onrender.com/login" : "/"}>
                {" "}
                <CustomButton onClick={userId ? handleLogout : ""}>
                  {userId ? "Logout" : "Login"}
                </CustomButton>
              </a>
            </div>
          </div>

          <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </>
    </header>
  );
};

export default Header;
