import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import Notifications from './Notifications';

import icon from '../assets/icons/icon.png';
import home from '../assets/icons/home.png';
import notification from '../assets/icons/notification.png';
import logout from '../assets/icons/logout.png';

import '../css/Header.css';

const Example = (props) => {
  const { onLogout } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNots, setIsOpenNots] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleNot = () => setIsOpenNots(!isOpenNots);

  const handleLogout = () => {
    const storageKey = 'jwtToken';
    localStorage.removeItem(storageKey);
    onLogout();
  };

  return (
    <div className="Header">
      <Container>
        <Navbar expand="md">
          <NavbarBrand>
            <Link to="/">
              <img src={icon} alt="icon" />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            {isOpenNots && <Notifications />}
            <Nav className="mr-auto" navbar>
              <NavItem className="mx-2">
                <Link to="/">
                  <img width="28" src={home} alt="home" />
                </Link>
              </NavItem>
              <NavItem className="mx-2">
                <button onClick={toggleNot}>
                  <img width="28" src={notification} alt="notifications" />
                </button>
              </NavItem>
              <NavItem className="mx-2">
                <Link to="/auth/login" onClick={handleLogout}>
                  <img width="28" src={logout} alt="logout" />
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default Example;
