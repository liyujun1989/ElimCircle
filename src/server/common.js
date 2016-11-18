/**
 * 公用类
 */
'use strict';

/*API接口错误代码*/
export const ResponseCode = {
    Success : 8200,
    UserNotExist : 8300,
    UserInvalid : 8301,
    TokenInvalid : 8302,
    UserNameError : 8303,
    MobileError : 8304,
    NameOrPwdError : 8305,
    VCodeError : 8306,
    IpAddressError : 8400,
    NotFound : 8404,
    ServerInternalError : 8500,
    MissParam : 8600,
    ParamValueInvalid : 8700,
    ResDataIsEmpty : 8800,
    EncryptInvalid : 8900
};