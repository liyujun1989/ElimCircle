/**
 * 创建时间：2016年11月18日 16:07:56
 * 创建人：JaminHuang
 * 描述：AES 加密相关类
 */

import * as CryptoJS from 'crypto-js';

let AuthTokenKey = "elimusic--client"; //AES密钥
let AuthTokenIv = '8174635321487652'; //AES向量

/*AES加密*/
export function Encrypt(data) {
    let dataStr = JSON.stringify(data);
    let encrypted = CryptoJS.AES.encrypt(dataStr, CryptoJS.enc.Latin1.parse(AuthTokenKey), {
        iv: CryptoJS.enc.Latin1.parse(AuthTokenIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

/*AES解密*/
export function Decrypt(data) {
    let data2 = data.replace(/\n/gm, "");
    let decrypted = CryptoJS.AES.decrypt(data2, CryptoJS.enc.Latin1.parse(AuthTokenKey), {
        iv: CryptoJS.enc.Latin1.parse(AuthTokenIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}