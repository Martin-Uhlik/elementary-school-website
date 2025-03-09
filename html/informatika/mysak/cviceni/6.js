
var words = "Slunce je staré,přibližně 4,6 miliard let,což je řadí mezi,hvězdy středního věku,Bude svítit ještě, asi 5 až 7 miliard let.,Teplota na povrchu Slunce,činí asi 5800 K,proto je lidé,vnímají jako žluté.,Průměr Slunce je,zhruba 1 400 000 km,což činí asi,109 průměrů Země.,Jeho objem je tedy, asi 1.3 milionkrát větší,než je objem Země.";

var src = words.split(",");

var CurentWord = '', 
    obtiznost = 3,
    ExtraChars = '';

var description = [];

    description[0] = 'Písmena bez diakritiky a čísla';
    description[1] = 'Běžný text';
    description[2] = 'Písmena a čísla';      
    description[3] = 'Pouze písmena s diakritikou';
    description[4] = 'Všechny znaky klávesnice';
    description[5] = 'Všechny znaky včetně cizích s diakritikou';


var next_word = 0; 

function SetNewWord()
{
  if (obtiznost==6)
  {
    CurentWord = random_word(10,'234');
  }
  else if (obtiznost==5)
  {
    CurentWord = random_word(10,'123');
  }
  else if (obtiznost==4)
  {
    CurentWord = random_word(8,'12');
  }
  else if (obtiznost==3)
  {
    CurentWord = random_word(8,'01');
  }
  else if (obtiznost==1)
  {
    CurentWord = random_word(8,'0');
  }
  else
  {
    CurentWord = src[next_word];
    
    if (next_word > src.length)
    {
      next_word = 0;
    }
    else
    {
      next_word++;
    }
  }
  
  
  CurentWord = CurentWord.replace(/<!/g,'$');    
  $("#lblVzor p").html(CurentWord);
  
  ScoreMinus();    
}

$(document).ready(function(){
            
  $(".imgCover").click(function(){ SetNewWord(); });
  
  $(".BlackBoard textarea").keyup(function(e){
                  
    if ($(this).val() == CurentWord)
    {
      $(this).val('');
      
      ScorePlus();                         
      SetNewWord();                  
    }   
  }).keydown(function(e){
    
    if (e.which == 13)
    {
      e.preventDefault();
    }  
  })
  
  $( "#slider" ).slider({
	  orientation: "horizontal", range: "max", min: 1, max: 6, step: 1, value: obtiznost,
		slide: function( event, ui ) {								
				
      obtiznost = ui.value;
      
      $("#lbl_hor").html(obtiznost);
      $("#lbl_popis").html(description[(obtiznost-1)]);
                
      ResetCounter();
      SetNewWord();      
    }
	});
  
  //$( "#slider" ).trigger("focus");      
  
  $("#lbl_hor").html(obtiznost);
  $("#lbl_popis").html(description[(obtiznost-1)]);
  
  /*
  for (i =0; i< 300; i++)
  {
    SetNewWord();
    console.log(CurentWord);
  
  }
  */
    
}); 