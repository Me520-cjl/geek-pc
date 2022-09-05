// 导入页面组件
import Login from "../pages/Login";
import LayoutComponent from "../pages/Layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Article from "../pages/Article";
import Publish from "../pages/Publish";
import AuthRoute from "component/AuthRoute";
const routes = [
	{
		path: "/layout",
		element: <AuthRoute element={<LayoutComponent />} />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "home", element: <Home /> },
			{ path: "article", element: <Article /> },
			{ path: "publish", element: <Publish /> },
		],
	},
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
];

export default routes;
