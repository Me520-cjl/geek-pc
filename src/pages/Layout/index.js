import {
	PoweroffOutlined,
	HomeOutlined,
	DiffOutlined,
	EditOutlined,
} from "@ant-design/icons";
import { Layout, Menu, message, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useLocation, NavLink, Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/storage";
import { userInfo } from "api/user";

export default function Index() {
	const location = useLocation();
	const selectedKey = location.pathname;
	const [user, setUser] = useState({ data: { name: "123" } });
	const history = useNavigate();
	const getUser = async () => {
		try {
			const res = await userInfo();
			await setUser(res);
		} catch (err) {
			message.error(err.response.data.message);
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	const { Header, Content, Sider } = Layout;
	const confirm = () => {
		history("/login");
		removeToken("token");
		message.success("退出成功");
	};
	return (
		<Layout className={styles.layout}>
			<Header className="header">
				<div className="logo" />
				<div className="profile">
					<span onClick={getUser}>{user.data.name}</span>
					<span>
						<Popconfirm
							title="确定退出?"
							onConfirm={confirm}
							okText="退出"
							cancelText="取消"
						>
							<PoweroffOutlined />
							&nbsp;退出
						</Popconfirm>
					</span>
				</div>
			</Header>
			<Layout>
				<Sider width={200} className="site-layout-background">
					<Menu
						mode="inline"
						theme="dark"
						defaultSelectedKeys={selectedKey}
						defaultOpenKeys={["sub1"]}
						style={{
							height: "100%",
							borderRight: 0,
						}}
					>
						<Menu.Item key="/layout">
							<NavLink to="">
								<HomeOutlined></HomeOutlined>&nbsp;数据概览
							</NavLink>
						</Menu.Item>
						<Menu.Item key="/layout/article">
							<NavLink to="article">
								<DiffOutlined></DiffOutlined>&nbsp;内容管理
							</NavLink>
						</Menu.Item>
						<Menu.Item key="/layout/publish">
							<NavLink to="publish">
								<EditOutlined></EditOutlined>&nbsp;发布文章
							</NavLink>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout
					style={{
						padding: "24px",
					}}
				>
					<Content className="site-layout-background">
						<Outlet></Outlet>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
