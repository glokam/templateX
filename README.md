# templateX
## Simple templates

### Getting Started

Add templateX to your site... 

Build template...
```
<script id='x-template' type='text/template'>

    {{name}} {{surname}} - {{details.job}}

</script>
```

Render template...
```
var source = document.getElementById('x-template').innerHTML; // or $('#x-template).html()

var obj = {
        name: 'John',
        surname: 'Doe',
        details: {
            job: 'programmer',
            hobby: 'horror movies, soccer'
        }
    };
    
var template = templateX.render(source, obj);       
```

Result:
```

John Doe - programmer
```

Use your template...
```
\\ HTML

<p id='person'></p>

\\ jQ

$('#person').html(template);

```
and that's all :-)

### How to render HTML?

```
{text: '<h1>Lorem Ipsum</h1>'}
```
Standard X-tag don`t render html tags in strings...
```
{{text}} // &lt;h1&gt;Lorem Ipsum&lt;/h1&gt;
```
...if you want render html use '&' prefix:

```
{{&text}} // <h1>Lorem Ipsum</h1>
```

### Conditional Blocks

You can use 3 conditional statements.

One 'false' statement...
```
{{^property}}Show this when property is: 0, "", false, undefined, null, NaN or empty []. {{/property}}
```

...and two 'true' statements:
```
{{%property}}Show this when property is everything else.{{/property}} //no looping

{{#property}}Show this when property is everything else.{{/property}} //looping when array
```
...the '#' prefix is also a loop...

### Loop

When you have array with objects...
```
    {
    category: "science fiction",
    books: [
        {author: 'Herbert George Wells', title: 'The Time Machine'},
        {author: 'Stanisław Lem', title: 'Fiasco'},
        {author: 'Philip K. Dick', title: 'The Man in the High Castle'}
    ]
    }
```

...you can iterate them with the '#' loop:
```
<ul>
    {{#books}}<li>{{author}} - {{title}} </li>{{/books}}
</ul>
```

Result:
```

<ul>
    <li>Herbert George Wells - The Time Machine</li>
    <li>Stanisław Lem - Fiasco</li>
    <li>Philip K. Dick - The Man in the Hight Castle</li>
</ul>
```

### Back To Main Data In Loop

...and if you want use some other property in the '#' loop...
```
    {
    category: "science fiction",
    books: [
        {author: 'Herbert George Wells', title: 'The Time Machine'},
        {author: 'Stanisław Lem', title: 'Fiasco'},
        {author: 'Philip K. Dick', title: 'The Man in the High Castle'}
    ]
    }
```

...just use '.' prefix...
```
<ul>
    {{#books}}<li>{{author}} - {{title}} ; {{.category}} </li>{{/books}}
</ul>
```

...to get:
```

<ul>
    <li>Herbert George Wells - The Time Machine ; science fiction</li>
    <li>Stanisław Lem - Fiasco ; science fiction</li>
    <li>Philip K. Dick - The Man in the Hight Castle ; science fiction</li>
</ul>
```