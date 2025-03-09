
var radius = 10;
var percent = 45;

var grid = parseInt(radius/2);
var points = parseInt(percent * ((grid*grid)/100));

var score = 0;

function SetScore()
{
  score = 0;
  
  $.each($("#tblPuzzle td[class]"),function(i,v){
                  
    if ($(this).attr("class") == $(this).find("a").attr("class"))
    {      
      score++;
    }     
  })
  
  $("#lblSpravne").html(score);
  $("#lblSpatne").html(((points*4)-score));
  /* $("#lblC").html(MouseClicks); */
        
  if (score==(points*4)) 
  { 
    Finito();     
  }
  else
  {
    ResetInfo();
  }
}

function CreateTable()
{
   $("#tblPuzzle").html('');
   
   for (var i = 0; i < radius; i++ )
   {                    
     var t = '';
                                
     for (var j = 0; j < radius; j++ )
     {
       t += '<td id="m' + j + '_' + i +'"><a></a></td>';      
     }
               
     $("#tblPuzzle").append( '<tr>' + t + '</tr>');   
   }   
}

function CreatePattern()
{              
   var i = 0;
   
   $("#tblPuzzle td").removeAttr("class");
   $("#tblPuzzle a").removeAttr("class");
      
   while (i < points)
   {
     var x = RandomNumber((grid-1));  
     var y = RandomNumber((grid-1));
     
     if ($("#m" + x + "_" + y).attr('class') == undefined)
     {
       var c = RandomNumber(1);
                      
       $("#m" + x + "_" + y).addClass("c"+c);
     
       $("#m" + ((grid*2) - x - 1) + "_" + y).addClass("c"+c);
      
       $("#m" + x + "_" + ((grid *2) - y - 1)).addClass("c"+c);
       $("#m" + ((grid*2) - x - 1) + "_" + ((grid *2) - y - 1)).addClass("c"+c);
       
       i++;           
     }                                                                       
   }    
}


$(document).ready(function(){         
   
   CreateTable();
   CreatePattern();

   $('#tblPuzzle td a')
   
   .click(function(){
          
     if ($(this).parent("td").attr("class")===undefined)
     {
       CreatePattern();               
     }          
     else if ($(this).parent("td").hasClass("c0"))
     { $(this).addClass("c0"); }
     else
     { $(this).removeClass("c1");  }
                 
     if (myTimer==null)
     {       
       startTimer();
     }
     
     MouseClicks++;
     SetScore();                  
   })
   
   .dblclick(function(){ 
     if ($(this).parent("td").hasClass("c1"))
       { $(this).addClass("c1"); }
     else 
      { $(this).removeClass("c0"); }
      
     SetScore();        
   })
      
   $("a#lblMixIt").click(function(){  
     CreatePattern(); 
     startTimer();
   })       
})