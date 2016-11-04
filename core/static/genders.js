d3.json("/media/genders.json?noCachePlz=" + (new Date()).getTime(), function(json) {
        var w = 128,                        
            h = 128,                            
            r = 64,                            
            data = d3.entries(json),
            color = d3.scale.linear().domain([0, data.length - 1]).range(["#F88","#88F"]);

        $('#genders').html('');
        var vis = d3.select("#genders")
            .append("svg:svg")              
            .data([data])                   
                .attr("width", w)           
                .attr("height", h)
            .append("svg:g")                
                .attr("transform", "translate(" + r + "," + r + ")")    

        var arc = d3.svg.arc()              
            .outerRadius(r)
            .innerRadius(0.6 * r);

        var pie = d3.layout.pie()           
            .value(function(d) { return d.value; });    

        var arcs = vis.selectAll("g.slice")     
            .data(pie)                          
            .enter()                            
        .append("svg:g")                
            .attr("class", "slice")
        .append("svg:path")
            .attr("stroke", "#fff")
            .attr("fill", function(d, i) { return d.data.key == "Male" ? "#88F" : (d.data.key == "Female" ? "#F88" : color(i)); } ) 
            .attr("d", arc)                                    
            .attr("cursor", "crosshair")
        .append("svg:title")
            .text(function(d) { return d.data.key; });
});
