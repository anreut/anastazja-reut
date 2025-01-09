---
title: "4 ways to center block elements in CSS"
date: "2020-04-16"
excerpt: ""
tags:
- css
---

Front-end developers quite often encounter the task of centering block elements in CSS (verticaly and horizontaly). In this article, I'd like to share the most popular ways that I personally use all the time.
<!-- more -->

### 1. Using `transform` property

Make use of `position` and `transform` properties.

```html
  <div class="container">
    <div class="child">Child</div>
  </div>
```

```css
.container {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 2. Using flexbox

Just define the parent container as an `flexbox` and it will do the job for you.

```html
  <div class="container">
    <div class="child">Child</div>
  </div>
```

```css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 3. Using grid

This method works the same way as `flexbox`.

```html
  <div class="container">
    <div class="child">Child</div>
  </div>
```

```css
.container {
  display: grid;
  align-items: center;
  justify-items: center;
}
```

### 4. Using tables

This method is quite tricky, but it does the job. So far, only one parent container has been used in HTML. But now we need one more container for the child.

```html
  <div class="container">
    <div class="inner-container">
        <div class="child">Child</div>
    </div>
  </div>
```

```css
.container {
  display: table;
}
.inner-container {
  display: table-cell;
  vertical-align: middle;
}
.child {
  margin: auto;
}
```

That's it :)