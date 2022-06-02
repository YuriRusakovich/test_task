import React from 'react';
import { render } from 'react-dom';
import App from '@components/app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();
