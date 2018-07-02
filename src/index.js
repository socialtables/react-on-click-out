import React, { Component } from "react";
import PropTypes from "prop-types";

function parentClassIncludes(target, className) {
	if (target) {
		const list = Array.prototype.slice.call(target.classList || []);
		return list.some(classItem => classItem.includes(className)) || parentClassIncludes(target.parentNode, className);
	}
	return false;
}


export default class OnClickOut extends Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
	}
	onClick(e) {
		const hasIgnoredClasses = this.props.ignoredClasses.some(name => parentClassIncludes(e.target, name));
		if (this.node && this.node.contains) {
			if (!this.node.contains(e.target) && !hasIgnoredClasses) {
				this.props.onClickOut();
			}
		}
	}

	componentDidMount() {
		document.addEventListener("click", this.onClick);
		document.addEventListener("touchstart", this.onClick);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.onClick);
		document.removeEventListener("touchstart", this.onClick);
	}

	render() {
		return <span ref={node => this.node = node}>{this.props.children}</span>;
	}
}

OnClickOut.propTypes = {
	onClickOut: PropTypes.func.isRequired,
	ignoredClasses: PropTypes.array,
};

OnClickOut.defaultProps = {
	ignoredClasses: []
};
