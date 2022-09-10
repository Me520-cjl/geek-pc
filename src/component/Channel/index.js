import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import { getChannel } from "api/article";

const { Option } = Select;

export default function Channel({ value, onChange }) {
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
	useEffect(() => {
		getChannels();
	}, []);

	return (
		<Select placeholder="请选择文章频道" value={value} onChange={onChange}>
			{channels.map((item) => (
				<Option key={item.id} value={item.id}>
					{item.name}
				</Option>
			))}
		</Select>
	);
}
