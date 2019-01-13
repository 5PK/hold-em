module.exports = 
{
getLobbyCode: function() {
var char;
var code = "";
for (var i = 0 ; i<5 ; i++) {
let char = Math.random().toString(36).substring(2, 3).toUpperCase();
code += char;}
// check if lobby cody is not a duplicate. ToDO lobby ids enum
// return (code != unique(code)) ? getLobbyCode(): code;
return code;}
};