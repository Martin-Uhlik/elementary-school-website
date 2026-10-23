
var themes = [];
    themes[0] = './srcs/theme_simpsons_0.png';    
    themes[1] = './srcs/theme_simpsons_1.png';
    themes[2] = './srcs/theme_simpsons_3.png';
    themes[3] = './srcs/theme_simpsons_4.png';
    themes[4] = './srcs/theme_simpsons_5.png';

var solved = [];

var pic_width = 640;
var pic_height = 480;

var cols = 3;
var rows = 3;

function PuzzleCreator(shuffle)
{            
   var pics = (cols * rows);   
   
   var slice_width = (pic_width / cols);
   var slice_height = (pic_height / rows);
         
   var slice = [];
       solved = [];
   
   var t = '';
   var s = 0;
   
   // save for later ... 
   
   var prev = $("#tblPuzzle td span").css("background-image");
    
   // Create Grid 
      
   $("#tblPuzzle").html('');
   
   for (var i = 0; i < rows; i++ ){               
     
     t = '';
                                
     for (var j = 0; j < cols; j++ ){
      s = ((i*cols)+j);       
      slice[s] = s+","+j+","+i;                       
      t += '<td id="cell_'+s+'"></td>';      
     }
               
     $("#tblPuzzle").append( '<tr>' + t + '</tr>');   
   }
   
   if (shuffle)
   {
     slice = Shuffle(slice);
   }
         
   // fill
             
   for (var i = 0; i < pics; i++ )
   {                    
     var temp = slice[i].split(",");
     
     solved[i] = (temp[0]==i);
      
     $("#cell_"+i).append('<span id="sl_'+temp[0]+'"></span>');                             
     $("#sl_"+temp[0]).css('backgroundPosition','-' + (temp[1]*slice_width) + "px -" + (temp[2]*slice_height) + "px");
   }
    
    $("#tblPuzzle td span").css({'width' : slice_width+'px', "height" : slice_height+"px", "display": "block", "cursor": "move", "z-index" : 6});
    
    // Drag & Drop events
      
    $("#tblPuzzle span").draggable({ snap: "td",
                                     start: function(event, ui){                                       
                                       if (myTimer==null)
                                       {
                                         startTimer();
                                       }
                                      
                                       MouseMoves++;                                                                                                                 
                                      },  
                                      stop: function(event, ui){                                                                         
                                        if (jQuery.inArray(false,solved)==-1)
                                        {
                                          Finito();                                         
                                        }
                                      }
    });
                                     
    $("#tblPuzzle td").droppable({ 
      drop: function( event, ui ) {                                 
        if (ui.draggable.attr("id").replace("s","cel") == $(this).attr("id")){
          
          // offsets comparison
          
          var p = ui.draggable.offset();
          var c = $(this).offset();; 
          
          var temp = $(this).attr("id").split("_");
          
          solved[temp[1]] = (p.left == c.left && p.top == c.top)                      
        }					
			}	
    })                                     
                                     
    
    $("#tblPuzzle td span").css("background-image",prev);
    $("#lbl_hor").html(cols);
    $("#lbl_ver").html(rows);                   
    $("#lbl_sum").html((rows*cols));
  }

  // Set background

  function setTheme(what)
  {    
    $("#tblPuzzle td span").css("background-image","url("+what+")");
  }
  
  // Go daddy, go!
    
  $(document).ready(function(){
   
    $(".center").css("margin","0 auto");
                
    $( "#slider-vertical" ).slider({
			orientation: "vertical", range: "max", min: 1, max: 10, step: 1, value: (11-rows),
			slide: function( event, ui ) {								
				rows = (11-ui.value); 
				PuzzleCreator(true);
        startTimer() 
       }
		});
		
		$( "#slider" ).slider({
			orientation: "vertical", range: "max", min: 1, max: 10, step: 1, value: (11-rows),
			slide: function( event, ui ) {				
				cols = (11-ui.value); 
				PuzzleCreator(true); 
        startTimer()
       }
		});		
  
    // set theme menu
                           
    for (var i=0; i<themes.length; i++){ $("#tblPuzzleThumbs").append('<th><a id="thm_'+i+'" href="#"><img height="93" src="'+themes[i]+'" /></a></th>'); } 
            
    // thumbs navi 
    
    $("#tblPuzzleThumbs a").click(function(event){
     event.preventDefault();     
     
     setTheme($(this).find("img").attr("src"));
               
     $("#tblPuzzleThumbs a").removeClass("selected");                             
     $(this).addClass("selected");
     
     PuzzleCreator(true);
     ResetCounter();       
    })    
    
    // set grid
                
    PuzzleCreator(true);
    
    // set default theme
           
    setTheme(themes[0]);
    $("#thm_0").addClass("selected");           
  })
