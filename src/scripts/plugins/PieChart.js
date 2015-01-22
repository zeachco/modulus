define(['d3'], function(d3){
  return function PieChart(){
    var self, viz;

    var w = 400;
    var h = 400;
    var r = h/2;

    var color = d3.scale.category20c();
    var arc = d3.svg.arc().outerRadius(r);

    this.options = {
      label: function(d, i){ return (i+1) +'. ' + (+d[0]); },
      map: function(d){ return +d[1]; },
      fill: function(d, i){ return color(i);}
    };

    this._init = function(){
      self = this;
      self.container = d3.select(self.el).append('div');

      self.container.append('h3').attr('class','well').html('Ok i\'m working on that one...');
      vis = self.container.append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(" + r + "," + r + ")")
      ;

    };

    this._update = function(){
      console.log('update', self.data);

      var pie = d3.layout.pie().value(self.options.map);
      var arc = d3.svg.arc().outerRadius(r);
      var arcsSet = vis.selectAll("g.slice").data(pie(self.data));

      arcsSet.enter().append("svg:g").attr("class", "slice").append('path');
      arcsSet.exit().remove();

      arcsSet.select('path')
        .transition().duration(self.options.animTime)
        .attr("fill", self.options.fill)
        .attr("d", arc)
      ;

      arcs.append("svg:text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
          return data[i].label;}
        )
      ;

    };
  };
});
