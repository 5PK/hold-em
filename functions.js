module.exports = 
{
getLobbyCode: function() {
var char;
var code = "";
for (var i = 0 ; i<5 ; i++) {
let char = Math.random().toString(36).substring(2, 3).toUpperCase();
code += char;}
return code;}
};