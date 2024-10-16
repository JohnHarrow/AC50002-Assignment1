var svg;
function d3Draw(dataset){
Width=3000;
Height=2000;
if ((typeof svg == 'undefined') ){
   svg= d3.select("body").append("svg")
   .attr("width",Width)
   .attr("Height",Height);
}  

var circles=svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle");

circles.attr("cx", function(d){
    return d.lng;
} )
.attr("cy",function(d){
    return d.lat;
} )
.attr("r", 10)
.attr("town",function(d){
   return d.Town;
} )
.attr("Population",function(d){
   return d.Population;
} )
.attr("County",function(d){
   return d.County;
} );     

}


function d3Update(dataset){

	var circles=svg.selectAll("circle")
	.data(dataset)
	.transition()
	.duration(2000)
	.ease("Bounce");

	circles.attr("cx", function(d){
      return d.lng;
  } )
  .attr("cy",function(d){
      return d.lat;
  } )
  .attr("r", 10)
  .attr("town",function(d){
     return d.Town;
  } )
  .attr("Population",function(d){
     return d.Population;
  } )
  .attr("County",function(d){
     return d.County;
  } );   
	   
	}

function loadData(){


	d3.select("p")
	.on("click",function(){
		
		updateData();
	});
   d3.json("http://34.147.162.172/Circles/Towns/10",function(error,data){
   if (error){
      console.log(error)
   }else{
      d3Draw(data);
      }
   }
   );
}
 
function updateData(){
  
   d3.json("http://34.147.162.172/Circles/Towns/10",function(error,data){
   if (error){
      console.log(error)
   }else{
      d3Update(data);
      }
   }
   );
}

window.onload= loadData;

