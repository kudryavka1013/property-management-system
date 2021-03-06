import {
    get,
    post
} from './httprequest'

// @param {Object} p [请求时携带的参数] 

// 用户登录
export const apiLogin = p => post('/owner/login', p)
// 获取用户信息
export const apiGetUserInfo = p => get('/owner/find', p)
// 获取房产信息
export const apiGetRealEstateInfo = p => get('/owner/gethouseholds', p)
// 修改密码
export const apiChangePassword = p => post('/owner/changepassword', p)
// 修改个人信息
export const apiChangeUserinfo = p => post('/owner/changeUserinfo', p)

// 管理员
export const apiAdminLogin = p => post('/admin/login', p)

export const apiAdminChangePassword = p => post('/admin/changepassword', p)


export const apiGetCommunityByCode = p => get('/community/find', p)

export const apiGetBuildingByCode = p => get('/building/find', p)

export const apiGetHouseholdByCode = p => get('/household/find', p)


// 小区接口
// 全部小区信息
export const apiAdminFindAllCommunity = p => get('/community/findall', p)
// 增加小区
export const apiAdminAddCommunity = p => post('/community/add', p)
// 编辑小区
export const apiAdminEditCommunity = p => post('/community/update', p)
// 删除小区
export const apiAdminDeleteCommunity = p => get('/community/delete', p)
// 查询小区下所有楼栋
export const apiAdminGetBuilding = p=>get('/community/getbuildings',p)

// 楼栋接口
// 全部楼栋信息
export const apiAdminFindAllBuilding = p => get('/building/findall', p)
// 增加楼栋
export const apiAdminAddBuilding = p => post('/building/add', p)
// 编辑楼栋
export const apiAdminEditBuilding = p => post('/building/update', p)
// 删除楼栋
export const apiAdminDeleteBuilding = p => get('/building/delete', p)
// 查询楼栋下所有房产
export const apiAdminGetHousehold = p => get('/building/gethouseholds',p)

// 房产接口
// 全部房产信息
export const apiAdminFindAllHousehold = p => get('/household/findall', p)
// 增加房产
export const apiAdminAddHousehold = p => post('/household/add', p)
// 编辑房产
export const apiAdminEditHousehold = p => post('/household/update', p)
// 删除房产
export const apiAdminDeleteHousehold = p => get('/household/delete', p)

// 业主管理
// 全部业主信息
export const apiAdminFindAllOwner = p => get('owner/findall', p)
// 增加业主
export const apiAdminAddOwner = p => post('/owner/add', p)
// 删除业主
export const apiAdminDeleteOwner = p => get('/owner/delete', p)