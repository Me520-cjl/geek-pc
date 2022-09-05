import React, { useState } from "react";
import { Card, Button, Checkbox, Form, Input, message } from "antd";
import "./index.scss";
import logo from "assets/logo.png";
import { login } from "api/user";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/storage";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const history = useNavigate();
	const onFinish = async (values) => {
		const { code, mobile } = values;
		try {
			setLoading(true);
			const res = await login(mobile, code);
			history("/layout");
			setToken(res.data.token);
			message.success("登录成功");
		} catch (err) {
			setLoading(false);
			message.error(err.response.data.message);
		}
	};
	return (
		<div className="login">
			<Card className="login-container">
				<img className="login-logo" src={logo} alt="" />
				{/* 登录表单 */}
				<Form
					validateTrigger={["onBlur", "onChange"]}
					initialValues={{
						mobile: "13911111111",
						code: "246810",
						remember: true,
					}}
					onFinish={onFinish}
				>
					<Form.Item
						name="mobile"
						rules={[
							{
								pattern: /^1[3-9]\d{9}$/,
								message: "手机号码格式不对",
								validateTrigger: "onBlur",
							},
							{ required: true, message: "请输入手机号" },
						]}
					>
						<Input size="large" placeholder="请输入手机号" />
					</Form.Item>
					<Form.Item
						name="code"
						rules={[
							{
								len: 6,
								message: "验证码6个字符",
								validateTrigger: "onBlur",
							},
							{ required: true, message: "请输入验证码" },
						]}
					>
						<Input
							size="large"
							placeholder="请输入验证码"
							maxLength={6}
						/>
					</Form.Item>
					{/*
      	此处需要将 valuePropName 属性值设置为 checked，也就是下面设置的内容
      	原因：Form.Item 默认操作的是 value 属性，所以，如果 Form.Item 的子节点的值不是 value ，就需要设置为它自己的值
      			比如，Checkbox 组件操作的是 checked，因此，需要将 valuePropName 设置为 "checked"
      */}
					<Form.Item name="remember" valuePropName="checked">
						<Checkbox className="login-checkbox-label">
							我已阅读并同意「用户协议」和「隐私条款」
						</Checkbox>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							block
							loading={loading}
						>
							登录
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Login;
