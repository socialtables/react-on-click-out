import React, { Component, PropTypes } from "react";

export default class OnClickOut extends Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
	}
	onClick(e) {
		if (!this.node.contains(e.target)) {
			this.props.onClickOut();
		}
	}

	componentDidMount() {
		document.addEventListener("click", this.onClick);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.onClick);
	}

	render() {
		return <span ref={node => this.node = node}>{this.props.children}</span>;
	}
}

OnClickOut.propTypes = {
	onClickOut: PropTypes.func.isRequired
};