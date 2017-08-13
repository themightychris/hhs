//from https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935
function InitLineChart() {
    //mock data for three lines on the line
    var data = [{
        "sale": "202",
        "year": "2000"
    }, {
        "sale": "215",
        "year": "2002"
    }, {
        "sale": "179",
        "year": "2004"
    }, {
        "sale": "199",
        "year": "2006"
    }, {
        "sale": "134",
        "year": "2008"
    }, {
        "sale": "176",
        "year": "2010"
    }];
    var data2 = [{
        "sale": "152",
        "year": "2000"
    }, {
        "sale": "189",
        "year": "2002"
    }, {
        "sale": "179",
        "year": "2004"
    }, {
        "sale": "199",
        "year": "2006"
    }, {
        "sale": "134",
        "year": "2008"
    }, {
        "sale": "176",
        "year": "2010"
    }];

    var data3 = [{
        "sale": "135",
        "year": "2000"
    }, {
        "sale": "182",
        "year": "2002"
    }, {
        "sale": "184",
        "year": "2004"
    }, {
        "sale": "192",
        "year": "2006"
    }, {
        "sale": "137",
        "year": "2008"
    }, {
        "sale": "148",
        "year": "2010"
    }];

    var vis = d3.select("#line-visualisation"),
        WIDTH = 500,
        HEIGHT = 500,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000, 2010]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134, 215]),
        xAxis = d3.svg.axis()
        .scale(xScale),
        yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
    
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);
    var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d.year);
        })
        .y(function(d) {
            return yScale(d.sale);
        })
        .interpolate("basis");
    vis.append('svg:path')
        .attr('d', lineGen(data))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    vis.append('svg:path')
        .attr('d', lineGen(data2))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    vis.append('svg:path')
        .attr('d', lineGen(data3))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
}
InitLineChart();

//from https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3
function InitBarChart() {
    //mock data for the horizontal bar chart
    var data4 = [{
        "name": "Apples",
        "value": 20,
    }, {
        "name": "Bananas",
        "value": 12,
    }, {
        "name": "Grapes",
        "value": 19,
    }, {
        "name": "Lemons",
        "value": 5,
    }, {
        "name": "Limes",
        "value": 16,
    }, {
        "name": "Oranges",
        "value": 26,
    }, {
        "name": "Pears",
        "value": 30,
    }];


    //sort bars based on value
    data4 = data4.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    })
    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    var margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 60
    };

    var width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#bar-visualisation").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data4, function (d) {
                return d.value;
            })]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data4.map(function (d) {
            return d.name;
        }));
    //make y axis to show bar names
    var yAxis = d3.svg.axis()
        .scale(y)
        //no tick marks
        .tickSize(0)
        .orient("left");

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data4)
        .enter()
        .append("g")

    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.value);
        });
    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.name) + y.rangeBand() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return x(d.value) + 3;
        })
        .text(function (d) {
            return d.value;
        });

}
InitBarChart();

