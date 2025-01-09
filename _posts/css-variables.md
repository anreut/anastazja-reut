---
title: "Changing CSS variables with JavaScript"
date: "2020-02-20"
excerpt: ""
tags:
- css
---

**CSS variables** are also called "CSS custom properties" or "cascading variables". When it was first introduced, preprocessors like Sass or Less had already become the standard in web development. <!-- more -->Preprocessors give us a lot of features that don't supported by native CSS, such as variables, mixins, modules, and so on. These features allow to avoid repetitive styles (DRY) and create more readable CSS structure.

So what is the difference between CSS variables and preprocessor variables then? **The main advantage of using native CSS variables is their ability to change dynamically. We can read and change them with JavaScript at runtime.** Let's see how it works.

---

### Declaration and basic usage

Declaring a CSS variable:
```css
:root {
    --primary-color: red;
}
```

Using a CSS variable:
```css
element {
    color: var(--primary-color);
}
```

We can also declare a variable with a fallback value. If given variable is not defined, the fallback will be used:
```css
element {
    color: var(--primary-color, red);
}
```

---

### Interacting with CSS variables from JavaScript

We can interact with CSS variables, reading and changing them using `getPropertyValue()` and `setProperty()` JavaScript methods:

```js
// Get a variable
getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color'); // red
```

```js
// Set a new variable value
document.documentElement.style
    .setProperty('--primary-color', 'blue');
```
---

### A real-life example. Creating a tooltip with CSS variables

In this example, I wanted to show CSS variables in action. I've created a basic tooltip that appears in the list of items. Tooltip is hidden by default. To handle its appearance, I modify three CSS variables using JavaScript: `--tooltip-opacity`, `--tooltip-top` and `--tooltip-left`.

<p class="codepen" data-height="365" data-theme-id="dark" data-default-tab="js,result" data-user="anreut" data-slug-hash="abOmjbr" style="height: 365px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="abOmjbr">
  <span>See the Pen <a href="https://codepen.io/anreut/pen/abOmjbr">
  abOmjbr</a> by Anastasia (<a href="https://codepen.io/anreut">@anreut</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

---

#### References:
[Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)