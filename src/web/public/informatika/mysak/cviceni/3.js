
var xradius = 22;
var yradius = 2;
var score = 0;
var tbl = [];
var selected='';

function SetScore()
{
  $("#lblSpatne").html(Spatne);
  $("#lblSpravne").html(Spravne);
    
  if (($("#tblPuzzle td a:visible").length) > 0)
  {
  
  }
  else
  {
    Finito();    
  }
}

function CreateTable()
{
  $("#tblPuzzle").html('');
  tbl = [];
   
  for (var i = 0; i < yradius; i++ )
  {                    
    var t = '';
                                
    for (var j = 0; j < xradius; j++ )
    {
      var index = ((i * (xradius)) + j); 
      t += '<td><a id="m' + index  +'"></a></td>';
      tbl[index] = index;       
    }
               
    $("#tblPuzzle").append( '<tr>' + t + '</tr>');   
  }
   
  $("#lbl_hor").html(xradius);
  $("#lbl_ver").html(yradius);   
}

function CreatePattern()
{                      
  tbl = Shuffle(tbl);
     
  for (i = 0; i<tbl.length; i+=2)
  {
    var c = random_color();
    $("a#m"+tbl[i]).css("background-color",c)  
    $("a#m"+tbl[i+1]).css("background-color",c)
  } 
}

$(document).ready(function(){         
   
   CreateTable();
   CreatePattern();

   $('body').on("click", '#tblPuzzle td a', function(){
     
     startTimer();
     
     if ($(this).hasClass("selected"))
     {
       $(this).removeClass("selected");
       selected = '';
     }
     else
     {
       $(this).addClass("selected");
     
       if (selected=='')
       {     
         selected = $(this).css("background-color"); 
       }
       else 
       {              
         if (selected == $(this).css("background-color"))
         {               
           $('#tblPuzzle td a.selected').hide();
           Spravne++;
         }
         else
         {
           Spatne++;
         }       
       
         selected = '';
         $('#tblPuzzle td a.selected').removeClass("selected");
         
         SetScore();
       }
     }              
     
     MouseClicks++;                       
   })
         
   $("#lblInfo a").click(function(){                 
     if ($(this).attr("id") == 'lblColPlus' && xradius < 24)
     {      
       xradius+=2;                      
     }
     
     if ($(this).attr("id") == 'lblColMinus' && xradius > 3)
     {
       xradius-=2;
     }
     
     if ($(this).attr("id") == 'lblRowMinus' && yradius > 1)
     {
       yradius--;
     }

     if ($(this).attr("id") == 'lblRowPlus' && yradius < 35)
     {
       yradius++;
     }

     endTimer();
     CreateTable();     
     CreatePattern();      
   })       
})