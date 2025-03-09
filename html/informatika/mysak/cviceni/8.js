
var p = 0;
var s = 1;

function setPattern()
{
  $("#patterns div").hide();
  
  //-- set default sizes
  
  $("#patterns pre").css("font-size","12px");;
  $("#patterns pre").css("line-height","12px");;
           
  var c = $("#patterns div:eq("+(s-1)+")");
  
  var w = parseInt(c.css("width").replace("px", ""));
  var h = parseInt(c.css("height").replace("px", ""));

  $("#lbl_hor").html(h);

  //-- better font size
  
  var f = parseInt((400-h)/10); 
  
  c.find("pre").css("font-size",f+"px");
  c.find("pre").css("line-height",f+"px");

  $(".Board textarea").css("font-size",f+"px");
  $(".Board textarea").css("line-height",f+"px");

  w = parseInt(c.css("width").replace("px", ""));
  h = parseInt(c.css("height").replace("px", ""));
  
  //-- align
  
  c.css("margin-left",((952 - w) / 2));
  c.css("margin-top",((360 - h) / 2));
        
  c.show(); 
  
  //-- slider info
  
  $("#lbl_hor").html(s);      
}

$(document).ready(function(){

  $("#patterns div").prepend('<img src="./srcs/blank.gif" />');   
  $("#patterns div").draggable();
 
  p = $("#patterns div").length;
  
  setPattern();
     
  $( "#slider" ).slider({
	  orientation: "horizontal", range: "max", min: 1, max: p, step: 1, value: s,
	  slide: function( event, ui ){
      s = ui.value;
      setPattern();
      startTimer();        
    }
  });	         
})