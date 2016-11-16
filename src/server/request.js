/**
 * 创建时间：2016年11月16日 17:18:18
 * 描述：请求公共类
 */
'use strict';
import fetch from 'isomorphic-fetch';

export function FetchPost(url, data) {
    return fetch(`${Config.URL}/${url}`, {
        headers: {"Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify(data)
    }).then(response=> {
        return response.json();
    })
}