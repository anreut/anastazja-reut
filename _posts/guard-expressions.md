---
title: "Guard expression"
date: "2020-03-03"
excerpt: ""
tags:
- javascript
- patterns
---

From [Wikipedia](https://en.wikipedia.org/wiki/Guard_(computer_science): *In computer programming, a **guard** is a boolean expression that must evaluate to true if the program execution is to continue in the branch in question. Regardless of which programming language is used, guard code or a guard clause is a check of integrity preconditions used to avoid errors during execution.*
<!-- more -->

In other words, the **guard expression** is an expression (also called pattern) that checks the simplest conditions with minimum of calculations to prevent errors and unexpected behavior.

---

Let's look at an example:

```js
const capitalize = str => {
    // Guard expression
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + s.slice(1);
}
```

This is classical example of the guard expression. At the beginning of the function, it checks whether passed value is a `string`. If it fails, prevent the function from further calculations. With this approach, the main code is at the top level, and not inside of `if statement condition`. It helps to avoid nesting and improve code readability.

Here is another example:

```js
const checkAge = age => {
  if (typeof age === 'number') {
    if (age < 21) return 'Not eligible';
    if (age >= 21 && < 60) return 'Eligible';
  }
  return null;
}
```

This is a simple function that checks age. It looks fine, but we can make some improvements here.

```js
const checkAge = age => {
    if (typeof age !== 'number') return null;
    if (age < 21) return 'Not eligible';
    if (age >= 21 && < 60) return 'Eligible';
}
```

The condition `return null if not a number` is quite obvious. So we start the function with the simple check and, if it fails, everything below the guard expression (the first check) falls. Now it's easier to read the function and, more importantly, it prevents unnecessary calculations.

---

#### References:
[Guard (computer science)](https://en.wikipedia.org/wiki/Guard_(computer_science))