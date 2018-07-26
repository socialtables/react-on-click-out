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
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.resetTouchInfo = this.resetTouchInfo.bind(this);
		this.startListenToTouchEvents = this.startListenToTouchEvents.bind(this);
		this.stopListenToTouchEvents = this.stopListenToTouchEvents.bind(this);
	}
	onClick(e) {
		const hasIgnoredClasses = this.props.ignoredClasses.some(name => parentClassIncludes(e.target, name));
		if (this.node && this.node.contains) {
			if (!this.node.contains(e.target) && !hasIgnoredClasses) {
				this.props.onClickOut();
			}
		}
	}

	onTouchMove({ touches: [touch] }) {
		this.userDragging = this.userDragging || false;
		this.startX = this.startX || touch.clientX;
		this.startY = this.startY || touch.clientY;

		if (
			(Math.abs(touch.clientX - this.startX) > this.props.dragInterval) || 
			(Math.abs(touch.clientY - this.startY) > this.props.dragInterval)
		) {
			this.userDragging = true;
		}
	}

	onTouchEnd(e) {
		if (!this.userDragging) {
			const hasIgnoredClasses = this.props.ignoredClasses.some(name => parentClassIncludes(e.target, name));
			if (this.node && this.node.contains) {
				if (!this.node.contains(e.target) && !hasIgnoredClasses) {
					this.props.onClickOut();
				}
			}
		}
		this.resetTouchInfo();
	}

	resetTouchInfo() {
		this.userDragging = false;
		this.startX = null;
		this.startY = null;
	}

	startListenToTouchEvents() {
		document.addEventListener("touchmove", this.onTouchMove);
		document.addEventListener("touchend", this.onTouchEnd);
		document.addEventListener("touchcancel", this.resetTouchInfo);
	}

	stopListenToTouchEvents() {
		document.removeEventListener("touchmove", this.onTouchMove);
		document.removeEventListener("touchend", this.onTouchEnd);
		document.removeEventListener("touchcancel", this.resetTouchInfo);
	}

	componentDidMount() {
		document.addEventListener("click", this.onClick);
		this.startListenToTouchEvents();
	}
	
	componentWillUnmount() {
		document.removeEventListener("click", this.onClick);
		this.stopListenToTouchEvents();
	}

	render() {
		return <span ref={node => this.node = node}>{this.props.children}</span>;
	}
}

OnClickOut.propTypes = {
	onClickOut: PropTypes.func.isRequired,
	ignoredClasses: PropTypes.array,
	dragInterval: PropTypes.number
};

OnClickOut.defaultProps = {
	ignoredClasses: [],
	dragInterval: 10
};
