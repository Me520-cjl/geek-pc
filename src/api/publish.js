import http from "utils/http";
import { getToken } from "utils/storage";

/**
 *获取文章列表
 * @param
 * @param
 * @returns
 */
export const publishArticle = (data, draft) => {
	return http({
		method: "POST",
		url: `/mp/articles?draft=${draft ? "false" : "true"}`,
		data: data,
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});
};
