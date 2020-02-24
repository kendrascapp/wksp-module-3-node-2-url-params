# 3.2.0 - Review concepts

---

## EJS

- What's the difference between these two?

```js
<%- myVar %>  // one has - assume myVar is a string. it will render it as whatever it is - if it's HTML it will render as HTML- you can push in HTML elements
<%= myVar %>   // one has = whatever is inside turns into  .string   it will print out as text  if you're just putting in a string, use the <%=
```

_...Why do we have two options?_

---

What is this for?

```js
<%- include('<PATH_TO_EJS_FILE', {}) %>
```

_...What makes this so powerful?_

---

What notation do we use to run JS snippets inside of an `.ejs` file?

`const array = ['one', 'two', 'three']`

```js
// Example
<ul>
    <% array.forEach(element => { %>
        <li>element</li>
    <% >});  %>
</ul>
// <%= is for javascript
```

---

## Express

- What express _routing method_ did we use yesterday?
  routing method - .get (listening on this routing method) - any broswer calling our site is using the .get method
- What are its parameters?
  app.get(put path here, function(request, response) {})
  the request object is whatever the user is requesting
  response object is how we send back stuff
- What is the minimum amount of code to set up an express server?

```js
const express = require("express");
const app = express();

app.get("/hello", function(request, response) {
  response.send("hello");
});

app.listen(8000), console.log("Server is up! Port 8000");
```

---
