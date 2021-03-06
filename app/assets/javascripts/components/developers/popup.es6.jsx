// Modules

/* global $ mixpanel */

import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import 'dialog-polyfill/dialog-polyfill.css';

// Util
import muiTheme from '../theme.es6';
import DeveloperShow from './show.es6';
import Dialog from '../../utils/dialog.es6';
import Environment from '../../helpers/environment.es6';

// Stylesheet
import '../styles/popup.sass';

const environment = new Environment();

class Popup extends Component {
  componentDidMount() {
    this.dialog = new Dialog({
      reactNodeId: 'popups-container',
      dialogId: this.popupNode.id,
    });

    this.dialog.toggle();
    this.dialog.get().classList.add('pulse');
    setTimeout(() => {
      this.dialog.get().classList.remove('pulse');
    }, 300);

    if (environment.isProduction) {
      mixpanel.track('Profile loaded', {
        userLogin: this.props.developer.login,
        premium: this.props.developer.premium,
        userName: this.props.developer.name,
      });
    }
  }

  render() {
    const { developer, signedIn } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <dialog
          id={`developer-profile-${developer.id}`}
          className="popup"
          ref={node => (this.popupNode = node)}
        >
          <Avatar
            size={50}
            className="close"
            onClick={() => this.dialog.close()}
            icon={<FontIcon className="material-icons">close</FontIcon>}
          />
          <DeveloperShow developer={developer} signedIn={signedIn} />
        </dialog>
      </MuiThemeProvider>
    );
  }
}

Popup.propTypes = {
  developer: React.PropTypes.object,
  signedIn: React.PropTypes.bool,
};

const PopupContainer = Relay.createContainer(
  Popup, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          id,
          name,
          ${DeveloperShow.getFragment('developer')}
        }
      `,
    },
  }
);

export default PopupContainer;
