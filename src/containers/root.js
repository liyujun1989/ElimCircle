/**
 * 创建时间：2016年11月9日 11:48:31
 * 创建人：JaminHuang
 * 描述：Root地址配置
 */
'use strict';
import Index from './';
import { ElimCircle, WeChatCircle } from '../containers/circle/index';
import { Gather } from '../containers/sign/index';

export default {
    component: Index,
    path: '/',
    childRoutes: [
        {
            component: ElimCircle,
            path: 'elim',
            title: '以琳·聚会摇奖'
        },
        {
            component: WeChatCircle,
            path: 'wechat',
            title: '以琳·摇奖转盘'
        },
        {
            component: Gather,
            path: 'gather',
            title: '以琳·聚会签到'
        }
    ]
}