//用于封装所有的localStorage的操作
const TOLEN_KEY = "token";

/**
 * 保存token
 * @param {*} token
 * @returns
 */
export const setToken = (token) => localStorage.setItem(TOLEN_KEY, token);

/**
 * 获取token
 * @param {*} token
 * @returns
 */
export const getToken = () => localStorage.getItem(TOLEN_KEY);

/**
 * 移除token
 * @param {*} token
 * @returns
 */
export const removeToken = (token) => localStorage.removeItem(token);

/**
 * 判断是否有token
 * @param {*} token
 * @returns
 */
export const isAuth = () => !!getToken();
