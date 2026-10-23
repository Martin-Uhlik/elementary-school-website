/**
 *  EDGERING (2013)
 *
 */  

var CurentWord = '', 
    obtiznost = 5,    
    rychlost = 3,
    all = 0,
    chyby = 0,
    A = '',
    running = false    
    ;

var description = [];

    description[0] = '';
    description[1] = 'Jenom čísla';
    description[2] = 'Malá písmena bez diakritiky';
    description[3] = 'Malá + Velká písmena bez diakritiky';
    description[4] = 'Pouze písmena s diakritikou';
    description[5] = 'Písmena a čísla';          
    description[6] = 'pouze speciální znaky';
    description[7] = 'pouze přehlásky';
    description[8] = 'Všechny znaky klávesnice';

var description2 = [];

    description2[0] = '';
    description2[1] = 'nejpomaleji';
    description2[2] = 'pomalu';
    description2[3] = 'normálně';      
    description2[4] = 'rychle';
    description2[5] = 'Velmi rychle';
    description2[6] = 'SUPERMAN';

var rychlosti = Array(0,3600,2800,2000,1400,1000,700);
var obtiznosti = Array(0,'5','6','76','1','01','3','2','0123');
    
var next_word = 0; 

function SetNewWord()
{
  CurentWord = random_word(1,obtiznosti[obtiznost]);
  all++;
  
  $("#lblAll").html(all);  
  
  $("#lblA").css({ 'backgroundColor' : '#fff'}).html('').show();      
  $("#lblQ").html(CurentWord);
      
  $.doTimeout( 'someid', rychlosti[rychlost], function(){
    $("#lblQ").fadeOut(200,function(){
      if (running)
      { 
        SetNewWord(); 
      }
      
      $("#lblQ").show();   
    });
  });       
}

function ResetMe()
{
  $("#btnStop").trigger('click');
  $("#lblA,#lblQ").html('?');
    
  // Clear score
  
  all = 0;
  chyby = 0;  
  
  A = '';
  CurentWord = '';  
  
  // labels and description
  
  $("#lbl_hor").html(obtiznost);
  $("#lbl_popis").html(description[obtiznost]);          

  $("#lbl_hor2").html(rychlost);
  $("#lbl_popis2").html(description2[rychlost]);   
}

$(document).ready(function() {
    
  $("#btnStart").click(function() {
        
    $(this).hide();
    $("#btnStop").show();
    
    $("#lblQ,#lblA").fadeOut(400, function(){
      $("#lblQ,#lblA").html('').show();
    });
    
    $.doTimeout('WaitForStart',1000, function(){
      running = true;
    
      ResetCounter();                 
      SetNewWord();              
    });    
  })

  $("#btnStop").click(function() { 
    
    running = false;
    
    $(this).hide();
    $("#btnStart").show();  
    
    $.doTimeout('someid');    
  });

  $("body").on('keypress',function(e) {
    
    if (CurentWord != '' && running)
    {
      A = String.fromCharCode(e.keyCode);       
      $("#lblA").html(A);
      
      if (CurentWord == A)
      {        
        Spravne++;        
        $("#lblA").css({ 'backgroundColor' : '#9bed3a'});                                  
      }
      else
      {
        chyby++;
      } 
      
      $("#lblSpravne").html(Spravne + '<span style="color: #666765">/' + chyby + '</span>');
      
      if (Spravne > 0)
      {      
        $("#lblProc").html( Math.round((Spravne / (all /100))) + '%');
      }  
    }              
  })
              
  $("#slider").slider({
	  orientation: "horizontal", range: "max", min: 1, max: (description.length - 1), step: 1, value: obtiznost,
		slide: function( event, ui ) {								
				
      obtiznost = ui.value;      
      ResetMe();                            
    }
	});

  $("#slider2").slider({
	  orientation: "horizontal", range: "max", min: 1, max: (description2.length - 1), step: 1, value: rychlost,
		slide: function( event, ui ) {											
      
      rychlost = ui.value;      
      ResetMe();         
    }
	});
              
  ResetMe();
}); 