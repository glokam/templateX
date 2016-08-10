# templateX - node.js module
## Easy templates with JavaScript

### Getting started

```
npm install templatex
```
or

```
npm install -save templatex
```

```
var templateX = require('templatex');
var template = "{{message}}, {{name}}";
var obj = {message: "Hello", name: "Johnny"};

templateX.render(template, obj) // result: "Hello, Johnny"
```

### Syntax
> templateX.render(**template**, **obj**);

**template** - _string_

You can safe your template as a variable...
```
var template = '{{name}} {{surname}}'; 

```

...but better way is to use _\<script\>_ tag...
```
<script id='x-template' type='text/template'>

    {{name}} {{surname}}

</script>
```
...and then you can get *template* parameter with js method:
```
var template = document.getElementById('x-template').innerHTML;
```

or you can get with jQuery...
```

var template = $('#x-template).html();
```
!! If you are using jQuery, please try to use [templateX - jQuery plugin] (https://github.com/glokam/templateX/tree/master/jQuery_plugin).

**obj** - _object literal_

Object literal with data to render.

F.e: 
```
{name: 'John', surname: 'Doe'}
```