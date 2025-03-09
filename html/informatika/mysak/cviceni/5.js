var matrix = [];

matrix[0] = '1;11;111;1111;11111;111111;1111111;11111111;111111111;1111111111;11111111111;111111111111;1111111111111';
matrix[1] = '1111111111111;111111111111;11111111111;1111111111;111111111;11111111;1111111;111111;11111;1111;111;11;1;';
matrix[2] = '11;1111;111111;11111111;1111111111;111111111111;11111111111111;111111111111;1111111111;11111111;111111;1111;11';
matrix[3] = '11111111111;111111111111111111111;1111111111111;11111111111111111111111;111111111111111;1111111111111111111111111;11111111111111111;1111111111111111111111111;111111111111111;11111111111111111111111;1111111111111;111111111111111111111;11111111111';

var AllowedKeys = [46,37,38,39,40,45,35,36];

function FillPattern()
{   
  for (i = 0; i<matrix.length; i++)
  {      
    var temp = matrix[i].replace(/;/gi, "\n"); 
     
    temp = temp.replace(/1/gi, String.fromCharCode(RandomNumber(25)+65));
    temp = temp.replace(/2/gi, String.fromCharCode(RandomNumber(25)+65));
    temp = temp.replace(/3/gi, String.fromCharCode(RandomNumber(25)+65));
    temp = temp.replace(/4/gi, String.fromCharCode(RandomNumber(25)+65));
     
    $("#patterns").append('<div><img src="./srcs/blank.gif" class="imgHover" /><pre>' + temp + '</pre></div>')                           
  }
}

function FillTA()
{
   // max length matrix = 133 
  
  var t = '';
                
  for (i=0; i<13; i++)
  {
    //t += '       x x x x x x x x x x x x x x x x x x x x x x x x x x x ';
    t += '       x x x x x x x x x x x x x x x x x x x x x x x x x x x x ';      
         
    if (i<12)
    {
      t += "\n";
    } 
  }
  
  $(".Board textarea").val(t);    
}


// Go daddy, go!
    
$(document).ready(function(){    
  FillPattern();  
  FillTA();
      
  $("textarea").keyup(function(event){
   // keyup 
          
  }).keydown(function(event){
    if (event.ctrlKey || event.shiftKey)
    {
      event.preventDefault();
    }
          
    if (jQuery.inArray(event.which, AllowedKeys)<0) 
    {
      event.preventDefault();
    }  
  });
  
  
  $("#patterns div").draggable();
  
  $('textarea').click(function() {        
    //$(this).val('');
    //FillTA();                   
  });    
})