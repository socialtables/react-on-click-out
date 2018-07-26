import React, { Component } from "react";
import PropTypes from "prop-types";

function parentClassIncludes(target, className) {
	if (target) {
		const list = Array.prototype.slice.call(target.classList || []);
		return list.some(classItem => classItem.includes(className)) || parentClassIncludes(target.parentNode, className);
	}
	return false;
}

const DRAG_THRESHOLD = 10;

export default class OnClickOut extends Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.onTouchCancel = this.onTouchCancel.bind(this);
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

	onTouchStart({touches: [touch]}) {
		this.userDragging = false;
		this.startX = touch.clientX;
		this.startY = touch.clientY;
	}

	onTouchMove({touches: [touch]}) {
		if (
			(Math.abs(touch.clientX - this.startX) > DRAG_THRESHOLD) || 
			(Math.abs(touch.clientY - this.startY) > DRAG_THRESHOLD)
		) {
			this.userDragging = true;
		}
	}

	onTouchEnd(e) {
		if (this.userDragging) {
			return;
		}

		const hasIgnoredClasses = this.props.ignoredClasses.some(name => parentClassIncludes(e.target, name));
		if (this.node && this.node.contains) {
			if (!this.node.contains(e.target) && !hasIgnoredClasses) {
				this.props.onClickOut();
			}
		}

		this.startX = 0;
		this.startY = 0;
	}

	onTouchCancel() {
		this.userDragging = false;
		this.startX = 0;
		this.startY = 0;
	}

	startListenToTouchEvents() {
		document.addEventListener("touchstart", this.onTouchStart);
		document.addEventListener("touchmove", this.onTouchMove);
		document.addEventListener("touchend", this.onTouchEnd);
		document.addEventListener("touchcancel", this.onTouchCancel);
	}

	stopListenToTouchEvents() {
		document.removeEventListener("touchstart", this.onTouchStart);
		document.removeEventListener("touchmove", this.onTouchMove);
		document.removeEventListener("touchend", this.onTouchEnd);
		document.removeEventListener("touchcancel", this.onTouchCancel);
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
};

OnClickOut.defaultProps = {
	ignoredClasses: []
};
