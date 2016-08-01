# templateX
## Simple templates

### Getting Started
```
<script id='x-template' type='text/template'>

    {{name}} {{surname}} - {{details.job}}

</script>
```

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

```

John Doe - programmer
```

### HTML
```
{text: '<h1>Lorem Ipsum</h1>'}
```

```
{{text}} // &lt;h1&gt;Lorem Ipsum&lt;/h1&gt;

{{&text}} // <h1>Lorem Ipsum</h1>
```

### Conditional Blocks
```
{{^property}}Show this when property is: 0, "", false, undefined, null, NaN or empty []. {{/property}}
```

```
{{%property}}Show this when property is everything else.{{/property}}
```

### Loop
```
<ul>
    {{#books}}<li>{{author}} - {{title}} </li>{{/books}}
</ul>
```

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

```

<ul>
    <li>Herbert George Wells - The Time Machine</li>
    <li>Stanisław Lem - Fiasco</li>
    <li>Philip K. Dick - The Man in the Hight Castle</li>
</ul>
```

### Back To Main Data When Loop
```
<ul>
    {{#books}}<li>{{author}} - {{title}} ; {{.category}} </li>{{/books}}
</ul>
```

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

```

<ul>
    <li>Herbert George Wells - The Time Machine ; science fiction</li>
    <li>Stanisław Lem - Fiasco ; science fiction</li>
    <li>Philip K. Dick - The Man in the Hight Castle ; science fiction</li>
</ul>
```