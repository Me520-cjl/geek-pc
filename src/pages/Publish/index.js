import {
	Card,
	Breadcrumb,
	Form,
	Button,
	Radio,
	Input,
	Upload,
	Space,
	message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import Channel from "component/Channel";
import React, { useState, useRef } from "react";
import { publishArticle } from "api/publish";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Publish = () => {
	// 创建表单实例
	// 注意：此处的 form 是从数组中解构出来的
	const [form] = Form.useForm();
	const fileListRef = useRef([]);
	const [fileList, setFileList] = useState([]);

	//上传图片
	const onUploadChange = (info) => {
		// info.fileList 用来获取当前的文件列表
		const fileList = info.fileList.map((file) => {
			// 刚从本地上传的图片
			if (file.response) {
				return {
					url: file.response.data.url,
				};
			}
			// 已有图片
			return file;
		});
		fileListRef.current = fileList;
		setFileList(fileList);
		console.log(fileList);
	};
	const [maxCount, setMaxCount] = useState(1);
	const changeType = (e) => {
		const count = e.target.value;
		setMaxCount(count);
		if (count === 1) {
			// 单图，只展示第一张
			const firstImg = fileListRef.current[0];
			setFileList(firstImg === undefined ? [] : [firstImg]);
		} else if (count === 3) {
			// 三图，展示所有图片
			setFileList(fileListRef.current);
		}
	};
	//提交表单
	const saveArticles = async (values, types) => {
		// 说明：如果选择 3 图，图片数量必须是 3 张，否则，后端会当做单图处理
		//      后端根据上传图片数量，来识别是单图或三图
		if (values.type !== fileList.length)
			return message.warning("封面数量与所选类型不匹配");

		const { type, ...rest } = values;
		const data = {
			...rest,
			// 注意：接口会按照上传图片数量来决定单图 或 三图
			cover: {
				type,
				images: fileList.map((item) => item.url),
			},
		};
		try {
			// true 草稿
			// false 正常发布
			await publishArticle(data, types);
			//console.log(res);
			message.success("发布成功");
		} catch (err) {
			message.error(err.response.data.message);
		}
	};
	const onFinish = async (values) => {
		saveArticles(values, true);
	};

	//提交草稿
	const saveDraft = async () => {
		try {
			const values = await form.getFieldsValue(true);
			console.log("草稿：", values);

			//saveArticles(values);
		} catch {}
	};

	return (
		<div className={styles.root}>
			<Card
				title={
					<Breadcrumb separator=">">
						<Breadcrumb.Item>
							<Link to="/home">首页</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>发布文章</Breadcrumb.Item>
					</Breadcrumb>
				}
			>
				<Form
					form={form}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ type: 1 }}
					onFinish={onFinish}
				>
					<Form.Item
						label="标题"
						name="title"
						rules={[{ required: true, message: "请输入文章标题" }]}
					>
						<Input
							placeholder="请输入文章标题"
							style={{ width: 250 }}
						/>
					</Form.Item>
					<Form.Item
						label="频道"
						name="channel_id"
						rules={[{ required: true, message: "请选择文章频道" }]}
					>
						<Channel></Channel>
					</Form.Item>

					<Form.Item label="封面">
						<Form.Item name="type">
							<Radio.Group onChange={changeType}>
								<Radio value={1}>单图</Radio>
								<Radio value={3}>三图</Radio>
								<Radio value={0}>无图</Radio>
								{/* <Radio value={-1}>自动</Radio> */}
							</Radio.Group>
						</Form.Item>
						{maxCount > 0 && (
							<Upload
								name="image"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList
								action="http://geek.itheima.net/v1_0/upload"
								multiple
								fileList={fileList}
								onChange={onUploadChange}
								maxCount={maxCount}
							>
								<div style={{ marginTop: 8 }}>
									<PlusOutlined />
								</div>
							</Upload>
						)}
					</Form.Item>
					<Form.Item
						label="内容"
						name="content"
						rules={[{ required: true, message: "请输入文章内容" }]}
					>
						<ReactQuill
							className="publish-quill"
							theme="snow"
							placeholder="请输入文章内容"
							style={{ height: 200, marginBottom: 100 }}
						/>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 4 }}>
						<Space>
							<Button
								size="large"
								type="primary"
								htmlType="submit"
							>
								发布文章
							</Button>
							<Button size="large" onClick={saveDraft}>
								存入草稿
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Publish;
