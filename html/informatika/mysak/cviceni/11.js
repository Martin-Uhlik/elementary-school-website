var matrix = [];

matrix[0] = 'Sejdou se zvířátka na večerní sněm a z nudy se dohodnou, že uspořádají soutěž ve vyprávění vtipů. Pravidla jsou jednoduchá: když někdo řekne vtip, kterému se nebudou smát úplně všichni, tak ho zabijou a jeho kůži prodají na trhu. Jako první byl vylosován zajíc. Dopovídal vtip a všichni se hrozně smějí, jenom želva ani nepípne a tváří se, jako by to byla ukrutná nuda. Zvířátkům je to divné, ale pravidla jsou pravidla, a tak zajíce zabijí. Jako druhý povídá vtip medvěd. Úžasný vtip. Všichni jsou mrtví smíchy, pro slzy skoro nevidí, jenom želva se vůbec nesměje. Zvířátkům je to zase divné, ale řeknou si, když se želva nesměje, tak to tě musíme, medvěde, zabít. A stalo se. Třetí den vypraví vtip stará sova. Neskutečně suchý a trapný vtip. Nikdo se ani neusměje, až želva najednou má záchvat smíchu, že nemůže ani mluvit, a popadá se za krunýř. Zvířátka se jí ptají, čemu se tak směje. A želva na to: "Ten zajícův fór byl ale dobrý, co?" A z toho plyne ponaučení: "Kdo se směje naposled, ten má dlouhé vedení."';

var obtiznost = 1;

function FillPattern()
{
  var text = matrix[0];
        
  var mix = ((text.length / 100) * obtiznost)
     
  var x = 0;
  var l = 0;
    
  for (i = 0;i<mix;i++)
  {
    x = parseInt(Math.random()*text.length + 1);                                          
    text = (text.substring(0,x) + String.fromCharCode(13) + text.substring(x));
                    
    var s = ''
    
    for (j=0; j <= RandomNumber(12); j++)
    {
      s += ' ';
    }
    
    x = RandomNumber(text.length);
    text = (text.substring(0,x) + s + text.substring(x));                            
  } 
    
  text = text.replace(/, /g,',');

  if (obtiznost > 8)
  {
    mix += mix;
  }
  
  if (obtiznost>3)
  {
    for (j=0; j <= mix; j++)
    {
      x = parseInt(Math.random()* text.length + 2);
      
      if (obtiznost < 9)
      {
        var d = (RandomNumber(10)+33);
      } 
      else
      {
        var d = (RandomNumber(33)+33);        
      }  
                
      text = (text.substring(0,x) + String.fromCharCode(d) + text.substring(x));                  
    }
  }  
  
  // text = matrix[0];
  
  $(".BlackBoard textarea").val(text);            
}

// Go daddy, go!
    
$(document).ready(function(){
  
  $(".Board textarea").click(function(event){ startTimer(); })
  
  $( "#slider" ).slider({
	  orientation: "horizontal", range: "max", min: 1, max: 10, step: 1, value: obtiznost,
		slide: function( event, ui ) {								
				
      obtiznost = ui.value;
      $("#lbl_hor").html(obtiznost);
      
      FillPattern();           
      ResetCounter();      
    }
	});
			    
  $("#lbl_hor").html(obtiznost); 
  
  $(".Board textarea").keyup(function(event){
    
    var have = $(this).val().replace(/\n/g,'');
        
    if (have == matrix[0])
    {    
      ScorePlus();
      Finito();
    } 
  
  })
      
  FillPattern();     
})