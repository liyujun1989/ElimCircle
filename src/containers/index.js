/**
 * 创建时间：2016年11月2日 11:25:36
 * 创建人：JaminHuang
 */
'use strict';
import React,{ Component } from 'react';

import * as indexStyle from '../static/style/lucky.css';

class Container extends Component {
    componentWillMount() {
        indexStyle.use();
    }

    render() {
        const { children,routes } = this.props;
        return (
            <div>{ children }</div>
        )
    }
}


export default Container;