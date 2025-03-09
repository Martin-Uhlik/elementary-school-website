/** EDGERING.ORG 2012 **/

// global variables

var myTimer = null;
var defaultStatus = null;
    
var hour, min, sec          
var default_text = '';

var KeyPress = MouseClicks = MouseMoves = Spravne = Spatne = 0;

var HighScoreOn = false;

/*******/

function ScorePlus()
{
  Spravne++;
  $("#lblSpravne").html(Spravne);
}

function ScoreMinus()
{
  Spatne++;
  $("#lblSpatne").html(Spatne);
}


function random_word(word_length,set)
{  
  var 
   temp = src = '',
   StringExtra = []; 
    
  StringExtra[0] = 'abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';    
  StringExtra[1] = 'žščřďťňľáéíóůúŽŠČŘĎŤŇĽÁÉÍÓŮÚ';
  StringExtra[2] = 'äëöüÄËÖÜ';    
  StringExtra[3] = '!"#$%&()*+,-./:;<=>?@[\]^_{|}~'+"'";
  StringExtra[4] = 'ñÑãÃõÕàèìòùÀÈÌÒÙÁÉÍÓÚáéíóú';
  StringExtra[5] = '0123456789';
  StringExtra[6] = 'abcdefghijklmnopqrstuvxyz';
  StringExtra[7] = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
  
  for (var i = 0; i<set.length; i++)
  {
    src += StringExtra[set.charAt(i)];
  }
      
  var x = src.length;
  var p = l = ''; 
  
  // We have to deprecate: </  & <? 
  
  while (temp.length < word_length)
  {
    l = src.charAt(Math.floor(Math.random()*x)); 
    
    if (
        ((l == '/' || l == '?') && p == '<')
        || (p == '<' && (StringExtra[0].indexOf(l) == -1))            
       ) { /** skip **/ }
    else
    {  
      temp += l;
    }  
    
    p = l;
  } 
  
  console.log(temp + ' - ' + temp.length); 
  
  return temp;
}

// Random hex color

function random_color() 
{
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) 
  {
    color += letters[Math.round(Math.random() * 15)];
  }
  
  return color;
}

// Array shuffle

function Shuffle(o) 
{
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o; 
}

// Random number in 0..IntervalEnd 
    
function RandomNumber(IntervalEnd)
{
  var x = 0;
      
  if (IntervalEnd>0)
  {    
    var ch = IntervalEnd.toString().length;
    var GotIt = false;
                              
    while (!GotIt)
    {
      var r = Math.random().toString();          
      var i = 2; // start positioin after dot

      while (i<(r.length-2) && !GotIt)
      {
        x = r.substr(i+=1,ch);                                                                    
        GotIt = (x <= IntervalEnd);                                       
      }                         
    }                              
  }
      
  return(parseInt(x));       
}

// Timer function group

function timer() 
{  
  if (++sec>59) 
  {
    if (++min>59) 
    {
      hour++;
      min=0;
    }
         
    sec=0;
  }
     
  var _min=min>9?min:"0"+min;
  var _sec=sec>9?sec:"0"+sec;
                         
  defaultStatus = _min+":"+_sec;
  
  if (hour>0)
  {
    var _hour=hour>9?hour:"0"+hour;
    defaultStatus = _hour+":"+_min+":"+_sec;
  }
}

function startTimer()
{
  if (myTimer == null)
  {        
    endTimer();
    ResetCounter();       
    
    myTimer = setInterval("timer()",1000);
  }
}

function endTimer()
{
  if (myTimer != null)
  {
    clearInterval(myTimer);
	  myTimer = null;          
  }
      
  ResetCounter(); 
}
       
function ResetCounter()
{          
  hour = min = sec =  0     
  KeyPress = MouseClicks = MouseMoves = Spravne = Spatne = 0;
      
  ResetInfo();      
} 

function ResetInfo()
{
  if (HighScoreOn)
  {
    $("#info p").html(default_text);
    $("#medal").hide();     
  }  
  
  HighScoreOn = false;              
}

function Finito()
{
  var msg1 = 'Hotovo! splěno za: '+defaultStatus;
  var msg2 = '';
                           
  if (MouseMoves>0)
  {
    msg2 = 'tahů myší: '+MouseMoves
  }
      
  if (msg2!='') 
  {
    msg1+='<span>'+msg2+'</span>';
  }
  
  // display end message
        
  $("#info p").html(msg1);    
  $("#medal").show();  
  
  HighScoreOn = true;            
} 


/*
 * jQuery doTimeout: Like setTimeout, but better! - v1.0 - 3/3/2010
 * http://benalman.com/projects/jquery-dotimeout-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
 
(function($){var a={},c="doTimeout",d=Array.prototype.slice;$[c]=function(){return b.apply(window,[0].concat(d.call(arguments)))};$.fn[c]=function(){var f=d.call(arguments),e=b.apply(this,[c+f[0]].concat(f));return typeof f[0]==="number"||typeof f[1]==="number"?this:e};function b(l){var m=this,h,k={},g=l?$.fn:$,n=arguments,i=4,f=n[1],j=n[2],p=n[3];if(typeof f!=="string"){i--;f=l=0;j=n[1];p=n[2]}if(l){h=m.eq(0);h.data(l,k=h.data(l)||{})}else{if(f){k=a[f]||(a[f]={})}}k.id&&clearTimeout(k.id);delete k.id;function e(){if(l){h.removeData(l)}else{if(f){delete a[f]}}}function o(){k.id=setTimeout(function(){k.fn()},j)}if(p){k.fn=function(q){if(typeof p==="string"){p=g[p]}p.apply(m,d.call(n,i))===true&&!q?o():e()};o()}else{if(k.fn){j===undefined?e():k.fn(j===false);return true}else{e()}}}})(jQuery);