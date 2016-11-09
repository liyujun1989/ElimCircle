/**
 * Created by JaminHuang on 2016/11/9.
 */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router'
import routes from './containers/root';
import 'babel-polyfill';

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('wrapper'));