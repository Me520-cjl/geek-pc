import http from "utils/http";
import { getToken } from "utils/storage";

/**
 *获取频道分类
 * @param
 * @param
 * @returns
 */
export const getChannel = () => {
	return http({
		method: "GET",
		url: "/channels",
	});
};

/**
 *获取文章列表
 * @param
 * @param
 * @returns
 */
export const getArticle = (data) => {
	return http({
		method: "GET",
		url: "/mp/articles",
		params: data,
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});
};

/**
 *获取文章列表
 * @param
 * @param
 * @returns
 */
export const delArticle = (target) => {
	return http({
		method: "DELETE",
		url: `/mp/articles/${target}`,
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});
};
