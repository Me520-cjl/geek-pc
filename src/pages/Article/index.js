import { Link } from "react-router-dom";
import {
	Card,
	Breadcrumb,
	Form,
	Button,
	Radio,
	DatePicker,
	Select,
	Table,
	Tag,
	Space,
	message,
	Modal,
} from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import {
	EditOutlined,
	DeleteOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import img404 from "assets/error.png";
import React, { useEffect, useState } from "react";
import { getChannel, getArticle, delArticle } from "api/article";
//import Item from "antd/lib/list/Item";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

export default function Article() {
	useEffect(() => {
		getChannels();
		getArticles();
	}, []);

	//获取模块分类数据
	const [channels, setChannles] = useState([]);
	const getChannels = async () => {
		try {
			const res = await getChannel();
			setChannles(res.data.channels);
		} catch (err) {
			message.error(err.response.data.message);
		}
	};

	//获取文章列表数据
	const [data, setData] = useState([]);
	const getArticles = async (params) => {
		try {
			const res = await getArticle(params);
			setData(res.data);
		} catch (err) {
			message.error(err.response.data.message);
		}
	};
	//筛选功能
	const onFinish = (values) => {
		const { status, channel_id, date } = values;
		// 将表单中选中数据，组装成接口需要的数据格式，然后，传递给接口
		const params = { channel_id };
		// 处理状态
		if (status !== -1) {
			params.status = status;
		}
		// 日期范围
		if (typeof date !== "undefined" && date !== null) {
			params.begin_pubdate = date[0].format("YYYY-MM-DD HH:mm:ss");
			params.end_pubdate = date[1].format("YYYY-MM-DD HH:mm:ss");
		}
		getArticles(params);
	};

	//分页功能
	const changePage = (page, per_page) => {
		const params = {};
		params.page = page;
		params.per_page = per_page;
		console.log(params);
		getArticles(params);
	};
	//删除文章功能
	const delArt = async (value) => {
		try {
			await delArticle(value);
			getArticles();
			message.success("删除成功");
		} catch (err) {
			message.error(err.response.data.message);
		}
	};
	const delArticles = async (value) => {
		confirm({
			title: "温馨提示",
			icon: <ExclamationCircleOutlined />,
			content: "此操作将永久删除该文章, 是否继续?",
			onOk: () => {
				// 执行删除操作
				delArt(value);
			},
		});
		// try {
		// 	await delArticle(value);
		// 	getArticles();
		// 	message.success("删除成功");
		// } catch (err) {
		// 	message.error(err.response.data.message);
		// }
	};

	// 优化文章状态的处理
	const articleStatus = {
		0: { color: "yellow", text: "草稿" },
		1: { color: "#ccc", text: "待审核" },
		2: { color: "green", text: "审核通过" },
		3: { color: "red", text: "审核失败" },
	};
	//表格结构
	const columns = [
		{
			title: "封面",
			dataIndex: "cover",
			render: (cover) => {
				return (
					<img
						src={cover.images[0] || img404}
						width={200}
						height={150}
						alt=""
					/>
				);
			},
		},
		{
			title: "标题",
			dataIndex: "title",
			width: 220,
		},
		{
			title: "状态",
			dataIndex: "status",
			render: (data) => {
				// 方式一：使用 if-else 判断每一种情况
				// if (data === 0) {
				//   return <Tag color="yellow">草稿</Tag>
				// } else if (data === 1) {
				//   return <Tag color="#ccc">待审核</Tag>
				// } else if (data === 2) {
				//   return <Tag color="green">审核通过</Tag>
				// } else if (data === 3) {
				//   return <Tag color="red">审核失败</Tag>
				// }

				// 方式二：使用对象属性的访问，替代了 原来的 if-else 或 switch-case 判断
				const tagData = articleStatus[data];
				return <Tag color={tagData.color}>{tagData.text}</Tag>;
			},
		},
		{
			title: "发布时间",
			dataIndex: "pubdate",
		},
		{
			title: "阅读数",
			dataIndex: "read_count",
		},
		{
			title: "评论数",
			dataIndex: "comment_count",
		},
		{
			title: "点赞数",
			dataIndex: "like_count",
		},
		{
			title: "操作",
			render: (data) => {
				return (
					<Space size="middle">
						<Button
							type="primary"
							shape="circle"
							icon={<EditOutlined />}
						/>
						<Button
							type="primary"
							danger
							shape="circle"
							icon={<DeleteOutlined />}
							onClick={() => {
								delArticles(data.id);
							}}
						/>
					</Space>
				);
			},
		},
	];

	return (
		<div>
			<Card
				title={
					<Breadcrumb separator=">">
						<Breadcrumb.Item>
							<Link to="/home">首页</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>内容管理</Breadcrumb.Item>
					</Breadcrumb>
				}
				style={{ marginBottom: 20 }}
			>
				<Form initialValues={{ status: -1 }} onFinish={onFinish}>
					<Form.Item label="状态" name="status">
						<Radio.Group>
							<Radio value={-1}>全部</Radio>
							<Radio value={0}>草稿</Radio>
							<Radio value={1}>待审核</Radio>
							<Radio value={2}>审核通过</Radio>
							<Radio value={3}>审核失败</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item label="频道" name="channel_id">
						<Select
							placeholder="请选择文章频道"
							style={{ width: 120 }}
						>
							{channels.map((item) => (
								<Option key={item.id} value={item.id}>
									{item.name}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item label="日期" name="date">
						<RangePicker locale={locale}></RangePicker>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							筛选
						</Button>
					</Form.Item>
				</Form>
				<Card
					title={`根据筛选条件共查询到 ${data.total_count} 条结果：`}
				>
					<Table
						rowKey="id"
						columns={columns}
						dataSource={data.results}
						pagination={{
							position: ["bottomCenter"],
							showSizeChanger: true,
							total: data.total_count,
							pageSizeOptions: [5, 10, 20, 50, 100],
							defaultPageSize: 5,
							onChange: changePage,
						}}
					/>
				</Card>
			</Card>
		</div>
	);
}
