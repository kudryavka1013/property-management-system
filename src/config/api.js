import {
    get,
    post
} from './httprequest'

// @param {Object} p [请求时携带的参数] 

// 用户登录
export const apiLogin = p => post('/owner/login', p)
// 用户注册/激活
export const apiRegister = p => post('/owner/register', p)
// 获取用户信息
export const apiGetUserInfo = p => get('/owner/find',p)
// 获取房产信息
export const apiGetRealEstateInfo = p => get('/owner/gethouseholds', p)
// 修改密码
export const apiChangePassword = p => post('/owner/changePassword', p)
// 修改个人信息
export const apiChangeUserinfo = p => post('/owner/changeUserinfo', p)

// 管理员
export const apiAdminLogin = p => post('/admin/login', p)

export const apiAdminChangePassword = p => post('/admin/changepassword',p)

export const apiAdminFindAllOwner = p => get('owner/findall', p)

export const apiAdminAdd = p => post('/owner/add',p)

export const apiAdminDelete = p => post('/owner/delete',p)

export const apiAdminFindAllCommunity = p => get('/community/findall',p)

export const apiAdminFindAllBuilding = p => get('/building/findall', p)

export const apiAdminFindAllHousehold = p => get('/household/findall',p)

export const apiGetCommunityByCode = p => get('community/find',p)

export const apiGetBuildingByCode = p => get('building/find',p)

export const apiGetHouseholdByCode = p => get('household/find',p)