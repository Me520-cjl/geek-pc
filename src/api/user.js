import http from "utils/http";
import { getToken } from "utils/storage";

/**
 *登录请求，用于用户登录
 * @param {string} mobile 手机号
 * @param {string} code 验证码
 * @returns
 */
export const login = (mobile, code) => {
	return http({
		method: "POST",
		url: "/authorizations",
		data: {
			mobile,
			code,
		},
	});
};

export const userInfo = () => {
	return http({
		method: "GET",
		url: "/user/profile",
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});
};
