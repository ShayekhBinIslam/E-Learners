import React from "react";
import "../styles/topbar.css";
import axios from "axios";

import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import "../styles/dropdown.css";
import { ReactComponent as BellIcon } from "../icons/bell.svg";
import { ReactComponent as MessengerIcon } from "../icons/messenger.svg";
import { ReactComponent as CaretIcon } from "../icons/caret.svg";
import { ReactComponent as PlusIcon } from "../icons/plus.svg";
import { ReactComponent as CogIcon } from "../icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg";
import { ReactComponent as BoltIcon } from "../icons/bolt.svg";

const tracks = [
  {
    id: 1,
    name: "Web Development",
    des: "This is Web Development Career Track",
  },
  ,
  {
    id: 2,
    name: "Competetive Programming",
    des: "This is Competetive Programming Career Track",
  },
  ,
  { id: 3, name: "Math", des: "This is Math Career Track" },
];

const firstTrack = "Web Development";
const fistDes = "This is Web Development Career Track";

export default function Topbar() {
  return (
    <div className="topbar-container">
      <div className="topbarWrapper">
        <div className="topbarLeft-container">
          <div className="topLeft">
            <span className="logo">E-Learners</span>
          </div>

          <div className="tracksDropdown-container">
            Career Tracks
            <div className="tracksDropdown-menu">
              <NavItem icon={<CaretIcon />}>
                <DropdownMenu></DropdownMenu>
              </NavItem>
            </div>
          </div>
        </div>

        <div className="topRight">
          <div className="topbaricnos">login</div>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [activeTrack, setActiveTrack] = useState(firstTrack);
  const [activeDes, setActiveDes] = useState(fistDes);
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(tracks.length*43);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function setActiveDesName(des1, name1) {
    setActiveDes(des1);
    setActiveTrack(name1);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onMouseEnter={() => setActiveDesName(props.des, props.name)}
      >
        {props.children}
      </a>
    );
  }

  function DropdownItemRight(props) {
    return <div className="menu-item-right">{props.children}</div>;
  }

  return (
    <div className="dropDown-container">
      <div
        className="dropdown"
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <div className="menu">
          {tracks.map((out) => (
            <div>
              <div>
                <DropdownItem goToMenu={out.id} name={out.name} des={out.des}>
                  {out.name}
                </DropdownItem>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-item-right">
        <h4>{activeTrack}</h4>
        <br></br>
        {activeDes}
        <button>Explore</button>
      </div>
    </div>
  );
}
