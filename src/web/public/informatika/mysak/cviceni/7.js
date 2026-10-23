var matrix = [];

matrix[0] = '     1   1;  22212221222; 2222122212222; 222  1 1  222;      111;      111;   333333333;  33335553333; 3333351533333; 3333355533333; 3333333333333;444444444444444;444444444444444;44           44';
matrix[1] = ';;       1111;22    111111; 2  1111111112222; 2  444444444   2; 2  444444444   2; 2  333333333 22; 2  3333333332; 222444444444;     4444444;      22222;     2222222;    222222222';
matrix[2] = ';;;        3111;       13444;      113;     1113;    11413;   114413 11;  1111113 141; 33333333333333;  122222222221;   1222222221;----------------;'
matrix[3] = ';;   22222222222222;111 111111111111;111123334443332;11 123342Y24332;11  2334Y2Y4332; 11 23342Y24332;  112334Y2Y4332;   12233333332;     22222222;       2222;       2222;';

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

// Go daddy, go!
    
$(document).ready(function(){    
  FillPattern();  
  $("#patterns div").draggable();  
})