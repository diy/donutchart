# diy-donutchart

Render a donut chart using d3.

[![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=448cdeb44fa804d4e08c)

# example

Let's render a donut chart! MMMM!

```js
var donutchart = require('diy-donutchart');

var target = document.getElementById('donut-chart');

var data = {
    percent: 0.2
};

var options = {
    color: '#34a2d8',
    size: 160,
    thickness: 20
};

donutchart(target, data, options);
```

# methods

```js
var donutchart = require('diy-donutchart');
```

## donutchart($el, data, [options])


Appends a svg element to `$el`.

`$el` is the target element. `data` should be an object with a `percent`
property.

Options can contain:

`color` of the positive ring (background is light gray).

`size` is the width and height of the donut.

`thickness` adjusts the thickness of the donut ring.

```js
{
    color: '#34a2d8',
    size: 160,
    thickness: 20
}
```

# license

APACHE 2.0
