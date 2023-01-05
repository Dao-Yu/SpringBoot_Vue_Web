import request from "@/api";

/**
 * 登录
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function toLogin(data) {
    return request({
        url:'/user/login',
        method:'post',
        data:data
    })
}

/**
 * 登出
 * @returns {Promise<AxiosResponse<any>>}
 */
export function toLogOut() {
    return request({
        url:'/user/logout',
        method:'get',

    })
}

/**
 * 注册
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function toRegister(data) {
    return request({
        url:'/user/register',
        method:'post',
        data:data
    })
}

/**
 * 上传动态
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function toUploads(data) {
    return request({
        url:'/user/uploads',
        method:'post',
        data:data,
    })
}

/**
 * 修改用户头像
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function UpdateAvatar(data) {
    return request({
        url:"/user/userUpdateAvatar",
        method:"post",
        data:data
    })
}

/**
 * 修改用户基本信息
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 * @constructor
 */
export function UpdateUser(data) {
    return request({
        url:"/user/userUpdateUser",
        method:"post",
        data:data
    })
}




