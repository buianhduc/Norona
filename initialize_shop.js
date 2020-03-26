var list,things,json;
// fetch("https://raw.githubusercontent.com/buianhduc/Norona/master/database.json").then(function(response){
//     return response.json();
// }).then(function (obj){
//     console.log(obj);
//     // console.log(obj);
// }).catch(function(error){
//     console.log(error);
// })
// console.log(json);
// console.log("debug");
// for(var i=0; i<list.length; i+=1){
//     things=list[i];
//     console.things;
// }
var xhReq = new XMLHttpRequest();
xhReq.open("GET", 'https://raw.githubusercontent.com/buianhduc/Norona/master/database.json', false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);
for (var x in jsonObject){
    if (jsonObject.hasOwnProperty(x)){
        
    }
  }