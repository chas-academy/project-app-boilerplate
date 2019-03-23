import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import { NavLink, AuthNavLink } from "../../../Lib/Common/Views";
import SignOutButton from "../../../Redux/Containers/Sessions/SignOutButton";

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const referrer = window.location.pathname;

const Header = ({ match }) => (
  <StyledHeader>
     <div className="bar"></div>
     <div className="sub-bar"></div>
    {/* <Navbar inverse>
          <Navbar.Header>
            <Link to="/" className="navbar-brand">{process.env.REACT_APP_SITE_NAME}</Link>
            <Navbar.Toggle id="js-navbar-toggle-btn" />
          </Navbar.Header>
          <Navbar.Collapse>
            <ul className="navbar-nav nav navbar-right">
              <NavLink title="Redux" to="/redux" path={path} />
              <NavLink title="Sign In" to="/sign-in" path={path} isSignedOut />
              <AuthNavLink title="Admin" to="/admin/dashboard" />
              <AuthNavLink title="My Profile" to="/my-profile" path={path} />
              <SignOutButton referrer={referrer} />
            </ul>
          </Navbar.Collapse>
        </Navbar> */}
  </StyledHeader>
);

export default withRouter(Header);
