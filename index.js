var d3 = require('d3');

function donutChart(el, data, _arg) {
    if (!(this instanceof donutChart)) return new donutChart(el, data, _arg);

    var d3el = d3.select(el);
    var size;

    _arg = _arg || {};
    size = _arg.size || 200;
    var thickness = _arg.thickness || 20;
    this.color = _arg.color || '#ff000';
    this.data = data;
    this.radius = size / 2;
    this.innerRadius = this.radius - thickness;


    this.data._current = this.data.percent;

    //resize container to the same dimensions as graph
    d3el.style('width', this.size + 'px').style('height', this.size + 'px');

    //scales
    this.pie = d3.scale.linear().domain([0, 1]).range([0, 2 * Math.PI]);

    this.svg = d3el.append('svg')
        .attr('class', 'donut')
        .attr('width', size)
        .attr('height', size);

    return this.setup();
}

donutChart.prototype.setup = function() {
    var radius = this.radius,
        innerRadius = this.innerRadius,
        svg = this.svg;

    var outerArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius)
        .startAngle(0)
        .endAngle(2 * Math.PI);

    svg.append('path')
        .attr('class', 'outer-arc')
        .attr('d', outerArc)
        .attr('fill', '#dddddd')
        .attr('transform', 'translate(' + radius + ',' + radius + ')');

    return this.draw();
};
donutChart.prototype.draw = function(transition) {
    var data = this.data;
    var color = this.color;
    var radius = this.radius;
    var svg = this.svg;
    var that = this;

    var innerArc = d3.svg.arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.radius)
        .startAngle(0)
        .endAngle(function(d) {
            return that.pie(d.percent);
        });

    svg.selectAll('path.inner-arc')
        .data([data])
        .enter()
        .append('path')
        .attr('class', 'inner-arc')
        .attr('fill', color)
        .attr('transform', 'translate(' + radius + ',' + radius + ')')
        .attr('d', innerArc);

    function arcTween (a) {
        var current = a._current;
        var i = d3.interpolate(current, a.percent);
        current = i(0);
        return function(t) {
            return innerArc({
                percent: i(t)
            });
        };
    }

    if (transition) {
        svg.selectAll('path.inner-arc').transition().attrTween('d', arcTween);
    }
};

donutChart.prototype.update = function(data) {
    this.svg.selectAll('path.inner-arc').each(function(d) {
        data._current = d.percent;
    });
    this.data = data;
    this.draw(true);
};

module.exports = donutChart;
