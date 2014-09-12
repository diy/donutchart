var donutchart = require('../');

var target = document.getElementById('donut-chart');

var data = {
    percent: 0.2
};

donutchart(
    target, 
    data,
    {
        color: '#34a2d8',
        size: 160,
        thickness: 20
    }
);
