---
title: "Animation in React using React Transition Group"
date: "2018-08-26"
excerpt: ""
tags:
- react
---

Recently I was working on a new project that is developed in React. Part of my job was to translate static HTML into interactive React components. I wanted to liven up a bit the application by using animation.

<!-- more -->

After doing some research I came across several animation libraries like [React Transition Group](https://reactcommunity.org/react-transition-group/), React-spring, React-motion and others. Each of these libraries has its pros and cons, some of them I found hard to use. Everything depends on the project needs. I wanted to add nice slide and transition effects to some elements. It’s a quite simple animation so I decided to stick to React Transition Group because of its simplicity.

---

React Transition Group used to be React add-on. Now it’s a separate package that is maintained by the community. I should say right away that React Transition Group components don’t provide us with the animation itself. Instead it gives us a state for each lifecycle phase so we can apply CSS animation to the component when it changes the state.

Let’s take a look at how it works in practice. I’ve created a simple sidebar. It’s hidden by default and triggered by a button. When button is clicked the component will change the state and render the sidebar.

```jsx
import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
 state = {
  show: false
 };

 toggleShow() {
  this.setState({
   show: !this.state.show
  });
 }

renderSidebar() {
 if (this.state.show) {
  return (
   <div
    style={{
      width: "50%",
      height: "100vh",
      paddingTop: '10px',
      background: "green",
      color: "white",
      textAlign: "center",
      transition: "all 1s ease",
      position: "absolute",
      top: 0,
      left: 0
     }}
    >
     Hi, there!
    </div>
   )
  } else {
    return null
   }
  }

 render() {
  return (
   <React.Fragment>
    { this.renderSidebar() }
    <button
     onClick={ () => this.toggleShow() }
     style={{ float: "right" }}>
      Button
    </button>
   </React.Fragment>
  );
 }
}

render(<App />, document.getElementById("root"));
```

Now we’ve got this working. Let’s add a nice slide effect when the sidebar shows up. We are going to use `Transition` component. Let’s first install the package and import `Transition` component to our App.

```js
npm install react-transition-group --save

import Transition from "react-transition-group/Transition";
```

The `Transition` component can be in four states: `entering`, `entered`, `exiting` and `exited`. It allows us to describe the component behavior when it passes from one state to another. It also takes two main props: `timeout` and `in`.

In the `timeout` prop we set transition duration in milliseconds. The `in` prop is going to track the state. When `in` value equals `true` the component moves to `entering` state and stays there for 500ms before switching to `entered` state. The same process happens when `in` value equals `false` — first the component moves to `exiting` and then to `exited` state.

Another important detail I should mention that `Transition` component **returns a function with the state as an argument.** Placing children elements in it is not going to work.

Here is the finale code.

```jsx
import React, { Component } from "react";
import { render } from "react-dom";
import Transition from "react-transition-group/Transition";

class App extends Component {
state = {
  show: false
 };

 toggleShow() {
  this.setState({
   show: !this.state.show
  });
 }

renderSidebar() {
 return (
  <Transition in={this.state.show} timeout={1000}>
   {state => (
    <div
     style={{
      width: "50%",
      height: "100vh",
      paddingTop: "10px",
      background: "green",
      color: "white",
      textAlign: "center",
      transition: "all 1s ease",
      position: "absolute",
      top: 0,
      //This is where all the magic happens :)
      left: state === "entering" || state === "entered" ? 0 : "-50%"
     }}
    >
     Hi, there!
    </div>
   )}
  </Transition>
 )
}

render() {
 return (
  <React.Fragment>
   {this.renderSidebar()}

   <button
    onClick={() => this.toggleShow()}
    style={{ float: "right" }} >
     Button
   </button>

  </React.Fragment>
  );
 }
}

render(<App />, document.getElementById("root"));
```

As you can see I’ve just modified `renderSidebar` function. I’ve wrapped sidebar with `Transition` component where the `in` prop stores the state and the timeout is set to 1000ms. All the magic happens at CSS `left` property. When the state equals `entering` or `entered` it takes 0 and the component becomes visible. Otherwise it moves away by -50% (relative to its width) and becomes invisible.

{% asset_img react-transition-group.gif %}

This is how React Transition Group works. We do the animation using CSS. Of course, we can do a lot of things with it. React Transition Group provides us with other components like `CSSTransition` and `TransitionGroup` where we can add custom class names or animate elements in a list.

In conclusion, I’d like to say that React Transition Group is an excellent choice for simple animations.