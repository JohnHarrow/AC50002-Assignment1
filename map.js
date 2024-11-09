//Where I got the map: https://cartographyvectors.com/map/1061-united-kingdom-detailed-boundary
//Initial D3 code was taken from what was covered in the lectures.
//Chat GPT was used for some insight into how a map could be projected onto the svg and how to map the points onto them.
//Prompt used: How could I plot coordinates on a map of the uk using d3.

var svg, path, projection;

function d3Draw(dataset){
   const Width = 960;
   const Height = 960;

   if (typeof svg == 'undefined') {
      svg = d3.select("body").append("svg")
         .attr("width", Width)
         .attr("height", Height);
   }

//-----------------------------------------------------------------------------
//Built using what was learned from the above mentioned chat GPT prompt
   projection = d3.geo.albers()
      .center([0, 55.4])      
      .rotate([4.4, 0])        
      .parallels([50, 60])    
      .scale(4000)             
      .translate([Width / 2, Height / 2]);  

   path = d3.geo.path().projection(projection);

   const mapGroup = svg.append("g").attr("class", "map");

   d3.json("testMap.geojson", function(ukData) {
      const subunits = ukData.features;

      mapGroup.selectAll("path")
         .data(subunits)
         .enter().append("path")
         .attr("d", path)
         .attr("fill", "#cccccc")
         .attr("stroke", "#333");
   });

//--------------------------------------------------------------------------------

   const circlesGroup = svg.append("g").attr("class", "circles");

   var circles = circlesGroup.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle");

   circles.attr("cx", function(d) { return projection([d.lng, d.lat])[0]; })
      .attr("cy", function(d) { return projection([d.lng, d.lat])[1]; })
      .attr("r", 10)
      .attr("town", function(d) { return d.Town; })
      .attr("Population", function(d) { return d.Population; })
      .attr("County", function(d) { return d.County; });

   circlesGroup.raise();
}


function d3Update(dataset){
   var circles = svg.selectAll("circle")
      .data(dataset)
      .transition()
      .duration(2000)
      .ease("bounce");

   circles.attr("cx", function(d) { return projection([d.lng, d.lat])[0]; })
      .attr("cy", function(d) { return projection([d.lng, d.lat])[1]; })
      .attr("r", 10)
      .attr("town", function(d) { return d.Town; })
      .attr("Population", function(d) { return d.Population; })
      .attr("County", function(d) { return d.County; });

   svg.select(".circles").raise();
}

function loadData(){
   d3.select("p").on("click", function() {
      updateData();
   });

   d3.json("http://34.147.162.172/Circles/Towns/10", function(error, data) {
      if (error) {
         console.log(error);
      } else {
         d3Draw(data);
      }
   });
}
 
function updateData(){
   d3.json("http://34.147.162.172/Circles/Towns/10", function(error, data) {
      if (error) {
         console.log(error);
      } else {
         d3Update(data);
      }
   });
}

window.onload = loadData;