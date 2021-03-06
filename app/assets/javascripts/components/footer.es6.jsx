/* global Routes */

import React from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import { css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Stylesheet
import footerStyles from './styles/footer.es6';

const Footer = () => (
  <MuiThemeProvider>
    <div className="footer container p-b-20 p-t-20">
      <Toolbar className={css(footerStyles.toolbar)}>
        <ToolbarGroup key={0} className={css(footerStyles.group)}>
          <ToolbarTitle
            text="Powered by Github API"
            className={css(footerStyles.text)}
          />
          <div key={2}>
            <ToolbarTitle
              text="&copy; 2015-2016 Hireables"
              className={css(footerStyles.text, footerStyles.copyright)}
            />
            <a href={Routes.page_path('privacy_policy')}>
              <ToolbarTitle
                text="Privacy Policy"
                className={css(footerStyles.text, footerStyles.copyright)}
              />
            </a>
            <a href={Routes.page_path('cookies_policy')}>
              <ToolbarTitle
                text="Cookies Policy"
                className={css(footerStyles.text, footerStyles.copyright)}
              />
            </a>
          </div>
        </ToolbarGroup>
      </Toolbar>

      <small className={css(footerStyles.text)}>
        Disclaimer: This project is not affiliated with GitHub.
        GitHub® and the Octocat® logo are registered trademarks of GitHub,
        Inc., used with permission—https://github.com/logos
      </small>
    </div>
  </MuiThemeProvider>
);

export default Footer;
