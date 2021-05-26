import {
    get,
    post
} from './httprequest'

// @param {Object} p [请求时携带的参数] 

// 登录
export const apiLogin = p => post('/owner/login', p)
// 注册/激活
export const apiRegister = p => post('/owner/register', p)
// 获取房产信息
export const apiGetRealEstateInfo = p => get('/owner/getRealEstateInfo', p)
// 修改密码
export const apiChangePassword = p => post('/owner/changePassword', p)
// 修改个人信息
export const apiChangeUserinfo = p => post('/owner/changeUserinfo', p)