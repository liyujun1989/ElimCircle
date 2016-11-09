/**
 * 创建时间：2016年11月9日 11:48:31
 * 创建人：JaminHuang
 * 描述：Root地址配置
 */
'use strict';
import Index from './';
import { ElimCircle, WeChatCircle } from '../containers/circle/index';

export default {
    component: Index,
    path: '/',
    childRoutes: [
        {
            component: ElimCircle,
            path: 'circle',
            title: '以琳·抽奖算法'
        },
        {
            component: WeChatCircle,
            path: 'wechat',
            title: '以琳·摇奖转盘'
        }
    ]
}