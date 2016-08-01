# templateX
## Simple templates

### Getting Started

template e.g:
```
<script id='x-template' type='text/template'>

    {{name}} {{surname}} - {{details.job}}

</script>
```
render e.g.
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
result:
```

John Doe - programmer
```

### HTML

data:
```
{text: '<h1>Lorem Ipsum</h1>'}
```
result:
```
{{text}} // &lt;h1&gt;Lorem Ipsum&lt;/h1&gt;

{{&text}} // <h1>Lorem Ipsum</h1>
```

### Conditional Blocks

"False" Condition:
```
{{^property}}Show this when property is: 0, "", false, undefined, null, NaN or empty []. {{/property}}
```

"True" Condition
```
{{%property}}Show this when property is everything else.{{/property}} //no looping

{{#property}}Show this when property is everything else.{{/property}} //looping when array
```

### Loop

data:
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
template:
```
<ul>
    {{#books}}<li>{{author}} - {{title}} </li>{{/books}}
</ul>
```
result:
```

<ul>
    <li>Herbert George Wells - The Time Machine</li>
    <li>Stanisław Lem - Fiasco</li>
    <li>Philip K. Dick - The Man in the Hight Castle</li>
</ul>
```


### Back To Main Data In Loop

data:
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
template:
```
<ul>
    {{#books}}<li>{{author}} - {{title}} ; {{.category}} </li>{{/books}}
</ul>
```
result:
```

<ul>
    <li>Herbert George Wells - The Time Machine ; science fiction</li>
    <li>Stanisław Lem - Fiasco ; science fiction</li>
    <li>Philip K. Dick - The Man in the Hight Castle ; science fiction</li>
</ul>
```