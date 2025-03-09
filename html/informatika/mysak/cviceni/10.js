
var evts = '623 - vznik Sámovy říše,863 - příchod Cyrila a Metoděje,935 - smrt sv. Václava,1212 - Zlatá bula sicilská,1306 - zavraždění Václava III - vymření Přemyslovců po meči,1310 - Lucemburkové na českém trůnu,1346 - bitva na Kresčaku - smrt Jana Lucemburského,1348 - založena Karlova univerzita,1378 - smrt Karla IV.,1415 - upálení mistra Jana Husa,1420 - Husitské války,1424 - zemřel Jan Žižka z Trocnova,1458 - Jiří z Poděbrad českým králem,1526 - nástup Habsburků na český trůn,1618 - začátek třicetileté války,1620 - bitva na Bílé hoře,1740 - Marie Terezie usedá na trůn,1774 - zavedení povinné školní docházky,1780 - končí vláda Marie Terezie,1848 - zrušení roboty,1868 - položení základního kamene Národního divadla,1881 - otevření + požár Národního divadla,1914 - 1.světová válka,1918 - vznik Československa,1942 - vypálení obcí Lidice a Ležáky,1945 - konec 2.světové války,1989 - Sametová revoluce,1993 - vznik České republiky,2004 - vstup do EU';
var AllowedKeys = [32,33,34,8,13,46,37,38,39,40,45,35,36];

function FillData()
{
  var t = Shuffle(evts.split(","));
  //var t = evts.split(",");
  var c = '';
  
  $(".Board textarea").val(c);
  
  for (i=0;i<t.length;i++)
  {
    c += t[i] + "\n";
  }
  
  $(".Board textarea").val(c);
  startTimer();
  
  $(".Board textarea").setCursorPosition(0);    
}

function CheckIt()
{
   var t = $(".Board textarea").val().replace(/\s+?\n/gi,',');
       t = t.replace(/\n/gi,',');
       t = $.trim(t);
       t = t.replace(/([,]+)$/gi,'');
       t = t.replace(/^([,]+)/gi,'');
         
   if (t==evts) { Finito(); } 
   else 
   { 
     ResetInfo();      
   }    
}
    
$(document).ready(function(){    
  
  FillData();
  
  $("textarea").click(function(){ ResetCounter(); FillData(); CheckIt();  })
  
  $("textarea").keyup(function(event){   
    CheckIt();           
  }).keydown(function(event){
    
    if (event.ctrlKey)
    {
      // do nothing ...
    }            
    else if (jQuery.inArray(event.which, AllowedKeys)<0) 
    {
      event.preventDefault();      
    }
  });
  
  $("#lblMixIt").click(function(){ 
    FillData();     
  })
  
  $("#brdInfoPanel").append("<span> | " + evts.length + "</span>")
})


new function($) {
  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
}(jQuery);