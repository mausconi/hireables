/*
  Bootstrap components and api on DOM Load
*/

import Relay from 'react-relay';
import {
  mountComponents,
  unmountComponents,
} from './utils/componentMounter';

/* global Turbolinks document */

// Get auth and csrf tokens
import Authentication from './helpers/authentication.es6';

const auth = new Authentication();

// Setup API url, inject csrf token and auth token
const setupNetworkLayer = () => {
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('/graphql', {
      credentials: 'same-origin',
      fetchTimeout: 30000,
      retryDelays: [5000],
      headers: {
        'X-CSRF-Token': auth.csrfToken(),
        Authorization: auth.authToken(),
      },
    })
  );
};

// Finally Render components if available in DOM
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Turbolinks !== 'undefined' && typeof Turbolinks.controller !== 'undefined') {
    setupNetworkLayer();
    document.addEventListener('turbolinks:render', unmountComponents);
    document.addEventListener('turbolinks:load', mountComponents);
  } else {
    setupNetworkLayer();
    mountComponents();
  }
});
