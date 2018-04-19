import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from '../../Lib/Common/Axios';
import * as Session from '../../Lib/Helpers/Session';
import { closeNavbar } from '../../Lib/Common/Views';

export default class SignOut extends Component {
  constructor() {
    super();

    this.signOut.bind(this);
  }
  signOut() {
    if (Session.decodedToken() === false) return this.props.auth(false);

    return Axios.post(process.env.REACT_APP_API_SIGN_OUT_URL).then(() => {
      Session.deleteToken();
      closeNavbar();
      this.props.auth(false);
    });
  }

  render() {
    const { IsSignedIn, referrer } = this.props;

    if (IsSignedIn) {
      return (
        <li>
          <button className="sign-out-btn" onClick={this.signOut}>
            Sign Out
          </button>
        </li>
      );
    }

    return <Redirect to={referrer} />;
  }
}
