import axios from "axios"

// axios.defaults.baseURL = 'http://anj.tivnan.cn';
// axios.defaults.baseURL = 'https://www.fastmock.site/mock/10d77a2256638358995afacbffc337c3/anj';
axios.defaults.timeout = 10000

// get方法，对应get请求 
// @param {String} url [请求的url地址] 
// @param {Object} params [请求时携带的参数] 
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'GET',
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}
// post方法，对应post请求 
// @param {String} url [请求的url地址] 
// @param {Object} params [请求时携带的参数] 
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'POST',
            data: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}