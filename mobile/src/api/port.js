
import axios from 'axios';
import qs from 'qs';


const requestUrl = process.env.NODE_ENV === 'development' ? '' : 'http://api.caicui.com'; // 请求地址


/**
 * 1. 获取token
 * 2. 登录
 * 3. 获取学员信息
 */

export const getToken = params => { return axios.post(`${requestUrl}/api/zbids/app/gettoken/v1.0/`, qs.stringify(params)).then(res => res.data).catch(err => err)};
export const login = params => { return axios.post(`${requestUrl}/api/zbids/member/login/v1.0`, qs.stringify(params)).then(res => res.data).catch(err => err)};
export const getUserInfo = params => { return axios.post(`${requestUrl}/api/zbids/member/getmemberinfo`, qs.stringify(params)).then(res => res.data).catch(err => err)};
