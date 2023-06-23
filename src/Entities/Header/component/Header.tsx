import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import cx from 'classnames';
import './Header.scss';
import url from 'Shared/consts/url';

export const Header: React.FC = () => (
  <div>
    <Navbar color="light" light expand="md" className={cx('navbar')}>
      <Nav className={cx('mr-auto', 'ul')} navbar>
        <NavItem>
          <NavLink to={url.history} className="nav-link">
            History
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={url.withdraw} className="nav-link">
            Withdraw
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={url.deposit} className="nav-link">
            Deposit
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  </div>
);
