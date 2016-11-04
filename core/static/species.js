d3.json("/media/species.json?noCachePlz=" + (new Date()).getTime(), function(json) {
        var w = 128,
            h = 128,
            r = 64,
            color = d3.scale.category20c();
        $('#species').html('');
        var vis = d3.select("#species").append("svg:svg")
            .attr("width", w)
            .attr("height", h)
        .append("svg:g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

        var partition = d3.layout.partition()
            .sort(null)
            .size([2 * Math.PI, r * r])
            .value(function(d) { return (d.count ? d.count : 1); });

        var arc = d3.svg.arc()
            .startAngle(function (d) { return d.x; })
            .endAngle(function(d) { return d.x + d.dx; })
            .innerRadius(function(d) { return Math.sqrt(d.y / 2); })
            .outerRadius(function(d) { return Math.sqrt(d.y / 2 + d.dy * 2); });

        var species;
        species = json;
        var path = vis.data([json]).selectAll("path")
            .data(partition.nodes)
            .enter().append("svg:path")
            .attr("display", function(d) { return (d.depth ? null : "none"); })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .attr("cursor", "crosshair")
            .style("stroke", "#fff")
            .style("fill", function(d) { return color(d.name); })
            .append("svg:title").text(function(d) { return d.name + (d.count ? ": " + d.count : "") });
});
