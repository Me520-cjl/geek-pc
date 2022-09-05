import axios from "axios";
import { removeToken } from "./storage";
import { history as customHistory } from "router/history";

//创建axios实例
const http = axios.create({
	baseURL: "http://geek.itheima.net/v1_0",
	timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(
	function (config) {
		// 在发送请求之前做些什么
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
http.interceptors.response.use(
	function (response) {
		// 对响应数据做点什么
		return response.data;
	},
	function (error) {
		if (error.response.status === 401) {
			removeToken();
			//方式一：页面会刷新
			//window.location.href='/login'
			//方式二
			// 跳转到登录页，并携带当前要访问的页面，这样，登录后可以继续返回该页面
			customHistory.push("/login", {
				from: customHistory.location.pathname,
			});
		}
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

export default http;
