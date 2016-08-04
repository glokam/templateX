# templateX - jQuery plugin


### SYNTAX

> jQuery(**selectorA**).templateX(**obj**, **selectorB** [, *template*]);

**selectorA** - _string_

CSS selector to get your template:

In this case *'#-template'*:
```
<script id='x-template' type='text/template'>

    {{name}} {{surname}}

</script>

````

**obj** - _object literal_

Object literal with data to render.

F.e: 
```
{name: 'John', surname: 'Doe'}
```

**selectorB** - _string_

CSS selector of element or elements where your teplate has to be render:

In this case *'#container'*:
```
<p id='container'></p>
```

**template** - _string_ - [optional]
 
!!When you set *template* parameter, then *selectorA* will be ignored.

F.e:

```
<p id='container'></p>
<script id='x-template' type='text/template'>

    {{name}} {{surname}}

</script>

[...]

var template = '{{surname}}, {{name}}'

$('#x-template').templateX({name:'John', surname:'Doe'},'#container', template); 
```
Result:
```
<p id='container'>Doe, John</p>
```
So, you can just write:
```
$().templateX({name:'John', surname:'Doe'},'#container', template);
``` 

### Working with $.ajax:

```
$.ajax({
    url: 'index2.html',
    success: function (data) {
    $().templateX(fibonaci, '#yyy', data);
    }
});

```

### Creating Elements 

```
<div class='.pcontainer'></div>

[...]

var paragraph = $('#x-template').templateX({name: 'John', surname:'Doe'}, '<p>')

paragraph.style('color', 'red');

paragraph.appendTo('.pcontainer');
```
Result:
```
<div class='.pcontainer'>
    <p style='color:red;'>John Doe</p>
</div>
```