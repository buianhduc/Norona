var list,things;
fetch("https://raw.githubusercontent.com/buianhduc/Norona/master/database.json").then(function(response){
    return response.json();
}).then(function (obj){
    // list=JSON.parse(obj);
    // console.log(obj);
}).catch(function(error){
    console.log("there is an error");
})
console.log(list);
// for(var i=0; i<list.length; i+=1){
//     things=list[i];
//     console.things;
// }