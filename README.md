# React On Click Out

A component that allows you to fire an event when clicking outside the children of this wrapper component

### Install
` npm install react-on-click-out`

###  Props

#### `onClickOut`
A function that is called when clicking outside of the children of this component
#### `children`
what will be rendered inside of this component
#### `ignoredClasses`
An array of class strings that will not trigger `onClickOut` function when clicked on


### Use

```js
import React, { Component } from "react";
import OnClickOut from "react-on-click-out";
export default class UserTour extends Component {
	state = { clickedOut: false };
	render() {
		return (
			<OnClickOut onClickOut={() => this.setState({ clickedOut: true })}>
				<div>
					Wow great job
				</div>
			</OnClickOut>
		);
	}
}
```

- - -

Copyright (C) 2017 Social Tables, Inc. (https://www.socialtables.com) All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
