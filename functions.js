function getLobbyCode(){
 
 var code;
 var charArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
 var numArr = ["1","2","3","4","5","6","7","8","9","0"];
 code = charArr[Math.floor(Math.random()*charArr.length)] 
	+ charArr[Math.floor(Math.random()*charArr.length)] 
	+ charArr[Math.floor(Math.random()*charArr.length)] 
	+ charArr[Math.floor(Math.random()*charArr.length)] 
	+ numArr[Math.floor(Math.random()*numArr.length)];

 return code;
}

 

