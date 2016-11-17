import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'whatwg-fetch';

import {Page} from './pages/Page/Page.jsx';
import {AuthController} from './components/authController/index.jsx';


window.authController = new AuthController();
ReactDOM.render(<Page state={!window.authController.isAuthorized() ? "login" : "hotels"} />, document.getElementById('app'));
