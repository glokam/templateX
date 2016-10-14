# templateX - node.js module
## Easy templates with JavaScript

[![Latest Stable Version](https://img.shields.io/npm/v/templatex.svg)](https://www.npmjs.com/package/templatex)
[![License](https://img.shields.io/npm/l/templatex.svg)](https://www.npmjs.com/package/templatex)
[![NPM Downloads](https://img.shields.io/npm/dm/templatex.svg)](https://www.npmjs.com/package/templatex)

### Getting started

```js
npm install templatex
```
or

```js
npm install --save templatex
```

```js
var templateX = require('templatex'),
    template = "{{message}}, {{name}}",
    obj = {message: "Hello", name: "Johnny"};

templateX.render(template, obj) // result: "Hello, Johnny"
```
### templateX with Express >= 1.2.0 

From version 1.2.0, you can use templateX as Express template engine using express method.


hello.html file in /views folder:

```html
<h1>Hello, {{name}}</h1>

```

APP js file:
```js

var express = require('express');
    app = express(),
    templatex = require('templatex');    

app.engine('html', templatex.express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.get('/', function(req, res) {
    res.render('hello', {name: 'World'});
});


app.use(function (req, res) {
    res.sendStatus(404);
});

var server = app.listen(8000);

```



### Tags:

```js
{name: 'Simon',
 details: [
    job: 'programmer',
    hobby: 'country <b>music</b>'
 ],
 favalbums: [
{name: "American Recordings", author: "Johnny Cash"},
{name: "Train A-Comin’", author: "Steve Earle"},
]
}
```

> {{*property*}} and {{&*property*}}

```html
<p>My name is {{name}}, and I love {{details.hobby}}!</p>
<p>My name is {{name}}, and I love {{&details.hobby}}!</p>

\\result of first: "<p>My name is Simon, and I love country &lt;b&gt;music &lt;/b&gt;!</p>"
\\result of '&' tag: "<p>My name is Simon, and I love country <b>music</b>!</p>"
```
> {{#*property*}}*content*{/*property*}} and {{%*property*}}*content*{{/*property*}}

as "true" statement
```html
{{#details.job}}We have information about {{name}} job{{/details.job}}{{#details.family}} and family{{/details.family}}!!
{{%details.job}}We have information about {{name}} job{{/details.job}}{{%details.family}} and family{{/details.family}}!!

\\BOTH result "We have information about Simon job!!"
```
as loop we can only use '#' tag
```html
<ul>
{{#favalbums}}<li>{{name}} by {{author}}</li>{{/favalbums}}
</ul>

<ul>
{{%favalbums}}<li>{{name}} by {{author}}</li>{{/favalbums}}
</ul>

\\result #
<ul>
    <li>American Recordings by Johnny Cash</li>
    <li>Train A-Comin’ by Steve Earle</li>
</ul>

\\result %
<ul>
    <li>Simon by</li>
</ul>
```
> {{^*property*}}*content*{/*property*}}

as "true" statement
```html
{{^details.family}}We don`t have information about {{name}} family{{/details.family}}{{^details.job}} and job{{/details.job}}!!

\\result "We don`t have information about Simon family!!"
```
> {%{ text }}

```
{%{My name is {{name}}!}}

//result "{{My name is Simon!}}"
```

> {{.*property}}

When looping...
```html
<ul>
{{#favalbums}}<li>I am {{.name}} and I love {{name}} by {{author}}</li>{{/favalbums}}
</ul>


\\result
<ul>
    <li>I am Simon and I love American Recordings by Johnny Cash</li>
    <li>I am Simon and I love Train A-Comin’ by Steve Earle</li>
</ul>
```