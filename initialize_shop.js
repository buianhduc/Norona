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
var items = document.getElementById("items")
for (var x in jsonObject){
    if (jsonObject.hasOwnProperty(x)){
        var newobj=jsonObject[x];
        items.insertAdjacentHTML("afterbegin", `<div class="item" id=${newobj.id}>
        <img src=${newobj.picture} class="image" style="width: 200px">
        <div class="Description">
            <div class="name">${newobj.name}</div>
            <div class="price">${newobj.price}</div>
        </div>
    </<img>`)
    }
  }