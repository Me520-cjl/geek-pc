import React, { Component } from "react";
import { Button, DatePicker } from "antd";

export default class Layout extends Component {
	render() {
		return (
			<div>
				首页布局组件
				<Button type="primary">Button</Button> <DatePicker />
			</div>
		);
	}
}
