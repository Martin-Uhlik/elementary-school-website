
var words = "Saturn,kolibřík,Merkur,Amazonie,Afrika,Japonsko,Olympiáda,Jupiter,planeta,Slunce,komplikace,vítězství,semafor,klávesnice,mikroskop,prázdniny,telefon,klobása,záchrana,revoluce,legrace,mikrofon,slunečnice,antilopa,kopřiva,čokoláda,detektivka,náhrdelník,trojúhelník,hrneček,leopard,Krkonoše,Šumava,Berounka,Litomyšl,Lotyšsko,Estonsko,kreveta,veleještěr,aligátor,tiskárna,pivovar,čerpadlo,stručnost,spokojenost,zahrada,střecha,harampádí,kotrmelec,olympiáda,diamant,držadlo,lokomotiva,ostrůvek,Austrálie,Oceánie,Antarktida,Amazonie,geometrie,knihovna,evropa,tajemství,zoufalství,přátelství,rozhodnutí,zárodek,buňka";

var src = words.split(",");
var l = (src.length-1);
var CurentWord = ''; 

function SetNewWord(TakeNew)
{
  if (TakeNew)
  {
    CurentWord = src[RandomNumber(l)];
  }
  
  var w = Shuffle(CurentWord.split(''));  
  
  $("#tblLetras").html('');
    
  for (i=0;i<w.length;i++)
  {
    $("#tblLetras").append('<li>'+w[i]+'</li>');     
  }

  $( "ul, li" ).disableSelection();		
}

$(document).ready(function(){

  SetNewWord(true);

  $("body #tblLetras").sortable({
	  revert: false,
		xis: 'x',
		stop: function(event,ui){			
      var x = '';        
      $.each($("#tblLetras li"),function(i){ x += $(this).html(); })
       
      if (x == CurentWord)
      {         
        Spravne++;
        $("#lblSpravne").html(Spravne);
        
        $("#tblLetras li").addClass("on");                          
        $("#tblLetras li").delay(1500).slideUp(2000,function(){
          SetNewWord(true);
        });                            
      }      
    }
  });
  
  $("#lblSkipIt").click(function(){        
    Spatne++;
    $("#lblSpatne").html(Spatne);  
    SetNewWord(true); 
  })

  $("#lblHelp").click(function(){ 
   
    var x = $("#tblLetras li:contains('" + CurentWord.charAt(0) + "'):first");   
    x.addClass("on");
   
    var y = $("#tblLetras li:contains('" + CurentWord.charAt(CurentWord.length-1) + "'):first");
    y.addClass("on");
   
    $("#tblLetras").prepend(x);             
    $("#tblLetras").append(y);
  })
}); 